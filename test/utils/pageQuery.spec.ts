import {
	PageListQueryByCreatedAt,
	PageListQueryByEncryptedCount,
	PageListQueryByHistory,
	getPageByPageName,
	PageAttributes
} from "@/utils/pageQuery";
import axios from 'axios';


require('dotenv').config({});



const createdAtTopData = {
	"Items": [{
		"pageName": "sample1",
		"pageTitle": "サンプル1",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}]
}

const createdAtAllData1 = {
	"Items": [
		{
			"pageName": "sample1",
			"pageTitle": "サンプル1",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1635280792679,
			"encryptedCount": 3,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample2",
			"pageName": "サンプル2",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637140940923,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageName": "sample3",
			"pageTitle": "サンプル3",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1635280725260,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample4",
			"pageName": "サンプル4",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1638287144824,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample5",
			"pageName": "サンプル5",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637237393337,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample6",
			"pageName": "サンプル6",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637058210389,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample7",
			"pageName": "サンプル7",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1637238161282,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample8",
			"pageName": "サンプル8",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1638716252214,
			"encryptedCount": 0,
			"type": "ActivePage"
		}, {
			"pageTitle": "sample9",
			"pageName": "サンプル9",
			"likes": 0,
			"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
			"createdAt": 1638285774592,
			"encryptedCount": 0,
			"type": "ActivePage"
		}
	],
	"LastEvaluatedKey": { dummy: "dummy" }
}
const createdAtAllData2 = {
	"Items": [{
		"pageName": "sample10",
		"pageTitle": "サンプル10",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}
	]
}

const encryptedCountTopData = {
	"Items": [{
		"pageName": "sample1",
		"pageTitle": "サンプル1",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}]
}

const encryptedCountAllData = {
	"Items": [{
		"pageName": "sample1",
		"pageTitle": "サンプル1",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}, {
		"pageTitle": "sample2",
		"pageName": "サンプル2",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1637140940923,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageName": "sample3",
		"pageTitle": "サンプル3",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280725260,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageTitle": "sample4",
		"pageName": "サンプル4",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1638287144824,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageTitle": "sample5",
		"pageName": "サンプル5",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1637237393337,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageTitle": "sample6",
		"pageName": "サンプル6",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1637058210389,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageTitle": "sample7",
		"pageName": "サンプル7",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1637238161282,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageTitle": "sample8",
		"pageName": "サンプル8",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1638716252214,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageTitle": "sample9",
		"pageName": "サンプル9",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1638285774592,
		"encryptedCount": 0,
		"type": "ActivePage"
	}, {
		"pageName": "sample10",
		"pageTitle": "サンプル10",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280765945,
		"encryptedCount": 0,
		"type": "ActivePage"
	}]
};

const historyTopData = {
	"Items": [{
		"pageName": "sample1",
		"pageTitle": "サンプル1",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}]
}
const historyAllData1 = {
	"Items": [{
		"pageName": "sample1",
		"pageTitle": "サンプル1",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}
	]
}
const historyAllData2 = {
	"Items": [{
		"pageName": "sample10",
		"pageTitle": "サンプル10",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}
	]
}
const historyString = 'sample1$sample2$sample3$sample4$sample5$sample6$sample7$sample8$sample9$sample10$';

const pageRequestData = {
	"Item": {
		"pageName": "sample1",
		"pageTitle": "サンプル1",
		"likes": 0,
		"sampleMessage": "U2FsdGVkX18R4tvDUpoheNPUIr%2FrM1q4i90bfiMZRCE%3D",
		"createdAt": 1635280792679,
		"encryptedCount": 3,
		"type": "ActivePage"
	}
}


describe('iframeEmbed.vue', () => {

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('日付順のクエリのテスト', async () => {
		const createdAt = new PageListQueryByCreatedAt({ apiUrl: process.env.API_DEVELOPMENT_URL || "" });
		jest.spyOn(axios, "post").mockResolvedValue({ data: createdAtTopData });
		const top = await createdAt.getTopItems();
		expect(top[0].pageTitle == createdAtTopData.Items[0].pageTitle).toBe(true);

		/**
		 * １回目のクエリの段階では、LastEvaluatedKeyが返ってきているので未完である
		 * ２回目のクエリの段階では、LastEvaluatedKeyがかえってきていないので、完了済みになる
		 * ３回目のクエリの段階では、完了済みのままである
		 */
		jest.spyOn(axios, "post").mockResolvedValue({ data: createdAtAllData1 });
		const first = await createdAt.getNextItems();
		expect(createdAt.isCompleted).toBe(false);
		jest.spyOn(axios, "post").mockResolvedValue({ data: createdAtAllData2 });
		const second = await createdAt.getNextItems();
		expect(createdAt.isCompleted).toBe(true);
		const third = await createdAt.getNextItems();

		/**
		 * １回目のクエリで９個
		 * ２回目のクエリは１個
		 * ３回目のクエリは、すでに完了しているはずなので空の配列を返す
		 * */
		expect(first.length == 9).toBe(true);
		expect(second.length == 1).toBe(true);
		expect(third.length == 0).toBe(true);
		expect(JSON.stringify(first[0]) === JSON.stringify(createdAtAllData1.Items[0])).toBe(true);
		expect(JSON.stringify(second[0]) === JSON.stringify(createdAtAllData2.Items[0])).toBe(true);
	});

	test('人気順のクエリのテスト', async () => {
		const encryptedCount = new PageListQueryByEncryptedCount({ s3Url: process.env.S3_RESOURCE_URL || "" });
		jest.spyOn(axios, "get").mockResolvedValue({ data: encryptedCountTopData });
		const top = await encryptedCount.getTopItems();
		expect(top[0].pageTitle == encryptedCountTopData.Items[0].pageTitle).toBe(true); //入力した値が、返せているかどうか

		/**
		 * １回目のクエリの段階では、未完である
		 * ２回目のクエリの段階では、完了済みになる
		 * ３回目のクエリの段階では、完了済みのままである
		 */
		jest.spyOn(axios, "get").mockResolvedValue({ data: encryptedCountAllData });
		const first = await encryptedCount.getNextItems();
		expect(encryptedCount.isCompleted).toBe(false);
		const second = await encryptedCount.getNextItems();
		expect(encryptedCount.isCompleted).toBe(true);
		const third = await encryptedCount.getNextItems();
		expect(encryptedCount.isCompleted).toBe(true);

		/**
		 * １回目のクエリで９個
		 * ２回目のクエリは１個
		 * ３回目のクエリは、すでに完了しているはずなので空の配列を返す
		 * */
		expect(first.length == 9).toBe(true);
		expect(second.length == 1).toBe(true);
		expect(third.length == 0).toBe(true);
		expect(JSON.stringify(first[0]) === JSON.stringify(encryptedCountAllData.Items[0])).toBe(true);
		expect(JSON.stringify(second[0]) === JSON.stringify(encryptedCountAllData.Items[9])).toBe(true);
	});
	test('使用履歴のクエリのテスト', async () => {
		const history = new PageListQueryByHistory({ apiUrl: process.env.API_DEVELOPMENT_URL || "", pagesString: historyString });
		jest.spyOn(axios, "post").mockResolvedValue({ data: historyTopData });
		const top = await history.getTopItems();

		/**
		 * DBから返ってきたページ情報が、あったページ情報はActivePage
		 * DBから返ってきたページ情報が、存在しなければページ情報はInactivePage
		 * */
		expect(top[0].type == "ActivePage").toBe(true);
		expect(top[1].type == "InactivePage").toBe(true);
		expect(JSON.stringify(top[0]) == JSON.stringify(historyTopData.Items[0])).toBe(true);
		expect(top[1].pageTitle == 'No title').toBe(true);

		/**
		 * １回目のクエリの段階では、未完である
		 * ２回目のクエリの段階では、完了済みになる
		 * ３回目のクエリの段階では、完了済みのままである
		 */
		jest.spyOn(axios, "post").mockResolvedValue({ data: historyAllData1 });
		const first = await history.getNextItems();
		expect(history.isCompleted).toBe(false);
		jest.spyOn(axios, "post").mockResolvedValue({ data: historyAllData2 });
		const second = await history.getNextItems();
		expect(history.isCompleted).toBe(true);
		const third = await history.getNextItems();
		expect(history.isCompleted).toBe(true);

		/**
		 * １回目のクエリで９個
		 * ２回目のクエリは１個
		 * ３回目のクエリは、すでに完了しているはずなので空の配列を返す
		 * */
		expect(first.length == 9).toBe(true);
		expect(second.length == 1).toBe(true);
		expect(third.length == 0).toBe(true);

		/**
		 * sample1は、DBにも登録されていたので同じ値を返す
		 * sample2は、DBに登録されていなかったので、pageTitleがNo titleのページ情報を返す
		 * sample10は、DBにも登録されていたので同じ値を返す
		 * */
		expect(JSON.stringify(first[0]) === JSON.stringify(historyAllData1.Items[0])).toBe(true);
		expect(first[1].pageTitle == 'No title').toBe(true);
		expect(JSON.stringify(second[0]) === JSON.stringify(historyAllData2.Items[0])).toBe(true);
	});


	test('ページ情報のリクエストのてす', async () => {
		/**
		 * 1回目のリクエストは、ページ名に対応する情報がDBに存在していた場合であり、同じ値を返す
		 * 2回目のリクエストは、ページ名に対応する情報がDBに存在しなかった場合であり、nullを返す
		 * */
		 jest.spyOn(axios, "get").mockResolvedValue({ data: pageRequestData });
		const first = await getPageByPageName(pageRequestData.Item.pageName, process.env.API_DEVELOPMENT_URL || "");
		jest.spyOn(axios, "get").mockResolvedValue({ data:{} });
		const second = await getPageByPageName("null", process.env.API_DEVELOPMENT_URL || "");
		expect(JSON.stringify(first) === JSON.stringify(pageRequestData.Item)).toBe(true);
		expect(second).toBe(null);
	});


});





