import axios from "axios";


interface PageAttributes {
	pageName: string,
	pageTitle: string,
	encryptedCount: number,
	likes: number,
	createdAt: number,
	sampleMessage: string,
	type: string
}


abstract class PageListQuery {
	protected _isCompleted: boolean = false;
	public abstract getTopItems(): Promise<Array<PageAttributes>> | Array<PageAttributes>;
	public abstract getNextItems(): Promise<Array<PageAttributes>> | Array<PageAttributes>;
	public get isCompleted() {
		return this._isCompleted;
	}
}


/**
 * 生成された日付によって、記事を取得する 
 */
class PageListQueryByCreatedAt extends PageListQuery {
	private _apiUrl: string;
	private _lastKey: object | undefined;
	constructor(config: { apiUrl: string }) {
		super();
		this._apiUrl = config.apiUrl;
	}

	async getTopItems(): Promise<Array<PageAttributes>> {
		try {
			const result = (await axios.post<{ Items: Array<PageAttributes>, LastEvaluatedKey?: Object }>(this._apiUrl + "pageList/createdAt", { sortDirection: "DESC" })).data;
			return result.Items;
		} catch (e) {
			return [];
		}

	}
	async getNextItems(): Promise<Array<PageAttributes>> {
		try {
			if (this.isCompleted) return [];
			const result = (await axios.post<{ Items: Array<PageAttributes>, LastEvaluatedKey?: Object }>(this._apiUrl + "pageList/createdAt", { sortDirection: "DESC", ExclusiveStartKey: this._lastKey })).data;
			if (result.LastEvaluatedKey) {
				this._lastKey = result.LastEvaluatedKey
			} else {
				this._isCompleted = true;
			};

			return result.Items;
		} catch (e) {
			return [];
		}
	}
}

/**
 * 暗号化された回数によって、記事を取得する
 */
class PageListQueryByEncryptedCount extends PageListQuery {
	private _topDataJsonKey: string = 'pageData/sortedTopDataByEncryptedCount.json';
	private _allDataJsonKey: string = 'pageData/sortedAllDataByEncryptedCount.json';
	private _s3Url: string;
	private _pageNumber: number = 1;
	private _allItems: Array<PageAttributes> = [];

	constructor(config: { s3Url: string }) {
		super();
		this._s3Url = config.s3Url;
	}
	async getTopItems(): Promise<Array<PageAttributes>> {
		try {
			//キャッシュ無効用のパラメータを添付
			const result = (await axios.get<{ Items: Array<PageAttributes> }>(this._s3Url + this._topDataJsonKey + '?timestamp=' + new Date().getTime())).data;
			return result.Items.slice(0, 9) || [];
		} catch (e) {
			return [];
		}

	}
	async getNextItems(): Promise<Array<PageAttributes>> {
		try {
			if (this.isCompleted) return [];
			//1番最初に呼び出されたときに取得する
			if (this._allItems.length == 0) {
				//キャッシュ無効用のパラメータを添付 人気順の全データの入ったjsonファイルに格納されている配列は最大120件
				const result = (await axios.get<{ Items: Array<PageAttributes> }>(this._s3Url + this._allDataJsonKey + '?timestamp=' + new Date().getTime())).data;
				if (result.Items) this._allItems = result.Items;
			}
			const selectPageArray = this._allItems.slice(this._pageNumber * 9 - 9, this._pageNumber * 9);
			if (this._allItems.length <= this._pageNumber * 9) {
				this._isCompleted = true;
			}
			else {
				this._pageNumber++;
			}
			return selectPageArray;
		}
		catch (e) {
			return [];
		}

	}
}
/**
 * local storageの使用歴から記事を取得する
 */
class PageListQueryByHistory extends PageListQuery {

	private _apiUrl: string;
	private _pageArray: Array<string>;
	private _pageNumber: number = 1;
	constructor(config: { pagesString: string, apiUrl: string }) {
		super();
		const pageArray = config.pagesString.split("$");
		pageArray.pop();
		this._pageArray = pageArray;
		this._apiUrl = config.apiUrl;
	}
	async getTopItems(): Promise<Array<PageAttributes>> {
		try {
			const topPageArray = this._pageArray.slice(0, 9);
			const result = (await axios.post<{ Items: Array<PageAttributes> }>(this._apiUrl + "pageList/batchGetPages", { pageArray: topPageArray })).data;
			let items: Array<PageAttributes> = [];
			//ソートする
			topPageArray.forEach((pageName) => {
				const item = result.Items.find(item => item.pageName == pageName);
				//対象のページが存在すれば、DBの結果を返しなければ、空のページ情報を返す
				if (!!item) { items.push(item) } else {
					items.push({
						pageName: pageName,
						pageTitle: "No title",
						encryptedCount: 0,
						likes: 0,
						createdAt: 0,
						sampleMessage: "",
						type: "InactivePage"
					})
				};
			})
			return items;
		} catch (e) {
			console.warn(e);
			return [];
		}
	}
	async getNextItems(): Promise<Array<PageAttributes>> {
		try {
			if (this.isCompleted) return [];
			//順不同の結果
			const targetPageArray = this._pageArray.slice(this._pageNumber * 9 - 9, this._pageNumber * 9);
			const result = (await axios.post<{ Items: Array<PageAttributes> }>(this._apiUrl + "pageList/batchGetPages", { pageArray: targetPageArray })).data;
			let items: Array<PageAttributes> = [];
			//ソートする
			targetPageArray.forEach((pageName) => {
				const item = result.Items.find(item => item.pageName == pageName);
				//対象のページが存在すれば、DBの結果を返しなければ、空のページ情報を返す
				if (!!item) { items.push(item) } else {
					items.push({
						pageName: pageName,
						pageTitle: "No title",
						encryptedCount: 0,
						likes: 0,
						createdAt: 0,
						sampleMessage: "",
						type: "InactivePage"
					})
				};
			});
			if (this._pageArray.length <= this._pageNumber * 9) {
				this._isCompleted = true;
			}
			else {
				this._pageNumber++;
			}
			return items;
		} catch (e) {
			console.warn(e);
			return [];
		}

	}
}

/**
 * タグによって、記事を取得する
 */
class PageListQueryByTagName extends PageListQuery {
	private _apiUrl: string;
	private _tagName: string;
	private _pageNumber: number = 1;
	private _allItems: Array<PageAttributes> = [];

	constructor(config: { apiUrl: string, tagName: string }) {
		super();
		this._apiUrl = config.apiUrl;
		this._tagName = config.tagName;
	}
	async getTopItems(): Promise<Array<PageAttributes>> {
		return this.getNextItems();
	}
	async getNextItems(): Promise<Array<PageAttributes>> {
		try {
			if (this.isCompleted) return [];
			//1番最初に呼び出されたときに取得する
			if (this._allItems.length == 0) {
				//キャッシュ無効用のパラメータを添付 人気順の全データの入ったjsonファイルに格納されている配列は最大120件
				const result = (await axios.post<{ Items: Array<PageAttributes>}>(this._apiUrl + "pageList/tag", { sortDirection: "DESC" ,tagName:this._tagName})).data;
				if (result.Items) this._allItems = result.Items;
			}
			const selectPageArray = this._allItems.slice(this._pageNumber * 9 - 9, this._pageNumber * 9);
			if (this._allItems.length <= this._pageNumber * 9) {
				this._isCompleted = true;
			}
			else {
				this._pageNumber++;
			}
			return selectPageArray;
		}
		catch (e) {
			return [];
		}

	}
}

async function getPageByPageName(pageName: string, apiUrl: string): Promise<PageAttributes | null> {
	try {
		const result = (await axios.get<{ Item: PageAttributes }>(apiUrl + `pageList/getPage?pageName=${pageName}`)).data;
		if (result.Item) {
			return result.Item;
		} else {
			return null;
		}
	} catch (e) {
		return null;
	}
};


export { PageListQueryByCreatedAt, PageListQueryByEncryptedCount, PageListQueryByHistory,PageListQueryByTagName, getPageByPageName, PageAttributes }