import { ToastAndroid, AsyncStorage } from "react-native";
import DrupalParser from "../services/DrupalParser.js";
import Database from "../services/Database.js";

export default class NodeLoader {
  constructor(checkpoint) {
    this.checkpoint = checkpoint || 0;
    this.partialCheckpoint = this.checkpoint;
  }

  clearAll(callback) {
    AsyncStorage.clear(callback);
  }

  load(page = 0) {
    fetch(
      "http://kimball.com.es/api/views/last_updates?display_id=updates&page=" +
        page,
      {
        method: "GET",
        headers: {}
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Loaded " + data.length + " nodes");
        data.forEach((node) => {
          let newCheckpoint = Date.parse(node.node_changed);

          if (newCheckpoint > this.checkpoint) {
            this.loadSingleNode(node.nid);
            this.partialCheckpoint = Math.max(
              this.partialCheckpoint,
              newCheckpoint
            );
          }
        });

        if (data.length === 50 && this.partialCheckpoint > this.checkpoint) {
          this.load(page + 1);
        } else {
          this.checkpoint = this.partialCheckpoint;
          new Database().updateCheckpoint(this.checkpoint);
        }
      })
      .catch((error) => {
        ToastAndroid.show("Error recibiendo nodos", ToastAndroid.SHORT);
        console.log(error.message);
      });
  }

  loadSingleNode(nid) {
    fetch("http://kimball.com.es/api/node/" + nid, {
      method: "GET",
      headers: {}
    })
      .then((response) => response.json())
      .then((data) => {
        let key = "node_" + data.type + "_" + nid;
        let value = JSON.stringify(new DrupalParser(data).simplify());

        AsyncStorage.setItem(key, value, (error) => {
          if (error !== null) {
            console.log("Error storing data of node " + nid + ": " + error);
          }
        });
      });
  }
}
