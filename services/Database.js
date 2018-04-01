import { AsyncStorage } from "react-native";
import DrupalParser from "../services/DrupalParser.js";

export default class Database {
	countNodes(callback) {
		AsyncStorage.getAllKeys((error, keys) => {
			console.log("keys = " + keys);
			callback(keys);
		});
	}

	fetchNodes(type, callback) {
		AsyncStorage.getAllKeys((error, keys) => {
			const filteredKeys = keys.filter(key => {
				return key.includes(type);
			});
			AsyncStorage.multiGet(filteredKeys, (error, stores) => {
				nodes = stores.map((result, i, store) => { return JSON.parse(store[i][1]) });
				callback(nodes);
			});
		});
	}
}
