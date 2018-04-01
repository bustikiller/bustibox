import { AsyncStorage } from "react-native";
import DrupalParser from "../services/DrupalParser.js";

export default class Database {
	constructor() {
		this.checkpointKey = "backend_fetch_checkpoint";
	}

	updateCheckpoint(checkpoint) {
		AsyncStorage.setItem(
			this.checkpointKey,
			checkpoint.toString(),
			(error) => {
				if (error !== null) {
					console.log("Error storing checkpoint: " + error);
				}
			}
		);
	}

	getCheckpoint(callback) {
		AsyncStorage.getItem(this.checkpointKey, (error, value) => {
			callback(value);
		});
	}

	countNodes(callback) {
		AsyncStorage.getAllKeys((error, keys) => {
			callback(keys);
		});
	}

	fetchNodes(type, callback) {
		AsyncStorage.getAllKeys((error, keys) => {
			const filteredKeys = keys.filter((key) => {
				return key.includes(type);
			});
			AsyncStorage.multiGet(filteredKeys, (error, stores) => {
				let nodes = stores.map((result, i, store) => {
					return JSON.parse(store[i][1]);
				});
				callback(nodes);
			});
		});
	}
}
