import { AsyncStorage } from "react-native";
import Database from "../services/Database.js";

export default class AccountingYearTree {
	constructor(year) {
		this.year = year;
		this.entries = [];
		this.entriesMap = {};
	}

	build(callback) {
		console.log("Building AccountingYearTree for year " + this.year);
		new Database().fetchNodes("partida_contable", nodes => {
			this.initAccountingEntriesMap(nodes);
			this.loadAccountingEntries(nodes);
			this.loadAccountingSeats(callback);
		});
	}

	initAccountingEntriesMap(nodes){
		nodes.forEach(node => {
			this.entriesMap[node.nid] = {node: node, children: [], leaves: []};
			console.log("Loaded accounting entry " + node.nid);
		});

		console.log("Finished loading accounting entries into memory");
	}

	loadAccountingEntries(nodes){
		nodes.forEach(node => {
			parentNid = node.partida_padre;
			if(parentNid){
				if(!this.entriesMap[parentNid]){
					console.log("ERROR: Parent node with id "+ parentNid + " was not found");
				} else {
					this.entriesMap[parentNid].children.push(this.entriesMap[node.nid])
				}
			}
		});

		let filteredEntries = Object.values(this.entriesMap).filter(entry => {
			return (parseInt(entry.node.anio_contable) === this.year);
		})

		this.entries = filteredEntries;
	}

	loadAccountingSeats(callback){
		new Database().fetchNodes("asiento_contable", nodes => {
			nodes.forEach(node => {
				parentNid = node.partida_contable;
				if(!this.entriesMap[parentNid]){
					console.log("ERROR: Parent node with id "+ parentNid + " was not found");
				} else {
					this.entriesMap[parentNid].leaves.push(node)
				}
			});

			console.log("entriesMap = " + JSON.stringify(this.entriesMap));

			callback();
		});
	}
}
