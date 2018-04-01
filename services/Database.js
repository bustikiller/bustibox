import { AsyncStorage } from "react-native";
import DrupalParser from "../services/DrupalParser.js";

export default class Database {

	constructor() {
		this.checkpoint_key = "backend_fetch_checkpoint"
	}

	updateCheckpoint(checkpoint){
		AsyncStorage.setItem(this.checkpoint_key, checkpoint.toString(), error => {
          if (error !== null) {
            console.log("Error storing checkpoint: " + error);
          }
        });
	}

	getCheckpoint(callback){
		AsyncStorage.getItem(this.checkpoint_key, (error, value) => {
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
