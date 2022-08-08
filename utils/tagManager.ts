import tag from '../tag.json';

interface TagAttributes {
	tagTitle: string,
	tagName: string
}

class TagManager {
	private static _instance: TagManager
	private tags: Array<TagAttributes>;

	private constructor() {
		this.tags = tag.Items;
	};

	public static get instance(): TagManager {
		if (!this._instance) {
			this._instance = new TagManager();
		}
		return this._instance;
	}

	public get tagList(): Array<TagAttributes> {
		return this.tags;
	}

	public getTagTitle(tagName: string): string {
		const tag = this.tags.find(tag => tag.tagName == tagName);
		return tag?.tagTitle || "";
	}

}

export { TagManager }