import { AsyncStorage } from "react-native";
import Database from "../services/Database.js";

export default class AccountingYearTree {
	constructor(year) {
		this.year = year;
		this.entries = [];
		this.entriesMap = {};
	}

	build(callback) {
		new Database().fetchNodes("partida_contable", (nodes) => {
			this.initAccountingEntriesMap(nodes);
			this.loadAccountingEntries(nodes);
			this.loadAccountingSeats(callback);
		});
	}

	initAccountingEntriesMap(nodes){
		nodes.forEach((node) => {
			this.entriesMap[node.nid] = {node: node, children: [], leaves: []};
		});
	}

	loadAccountingEntries(nodes){
		nodes.forEach((node) => {
			const parentNid = node.partida_padre;
			if(parentNid){
				if(this.entriesMap[parentNid]){
					this.entriesMap[parentNid].children.push(this.entriesMap[node.nid]);
				}
			}
		});

		let filteredEntries = Object.values(this.entriesMap).filter((entry) => {
			return (parseInt(entry.node.anio_contable) === this.year);
		});

		this.entries = filteredEntries;
	}

	loadAccountingSeats(callback){
		new Database().fetchNodes("asiento_contable", (nodes) => {
			nodes.forEach((node) => {
				const parentNid = node.partida_contable;
				if(this.entriesMap[parentNid]){
					this.entriesMap[parentNid].leaves.push(node);
				}
			});
			callback();
		});
	}
}
