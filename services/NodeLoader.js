import { ToastAndroid, AsyncStorage } from "react-native";
import DrupalParser from "../services/DrupalParser.js";

export default class NodeLoader {
  clearAll(callback) {
    AsyncStorage.clear(callback);
  }

  load(page = 0) {
    fetch("http://kimball.com.es/api/node?page=" + page, {
      method: "GET",
      headers: {}
    })
      .then(response => response.json())
      .then(data => {
        console.log("Loaded " + data.length + " nodes");
        data.forEach(node => {
          this.loadSingleNode(node.nid);
        });
        if (data.length === 20) {
          this.load(page + 1);
        }
      })
      .catch(error => {
        ToastAndroid.show("Error recibiendo nodos", ToastAndroid.SHORT);
        console.log(error.message);
      });
  }

  loadSingleNode(nid) {
    fetch("http://kimball.com.es/api/node/" + nid, {
      method: "GET",
      headers: {}
    })
      .then(response => response.json())
      .then(data => {
        let key = "node_" + data.type + "_" + nid;
        let value = JSON.stringify(new DrupalParser(data).simplify());

        AsyncStorage.setItem(key, value, error => {
          if (error !== null) {
            console.log("Error storing data of node " + nid + ": " + error);
          }
        });
      });
  }
}
