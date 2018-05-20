import { AsyncStorage } from "react-native";
import Database from "../services/Database.js";

export default class AccountingYearTree {
	constructor(year) {
		this.year = year;
		this.entries = [];
	}

	build(callback) {
		console.log("Building AccountingYearTree for year " + this.year);
		new Database().fetchNodes("partida_contable", nodes => {
			let filteredNodes = nodes.filter(node => {
				console.log("node = " + JSON.stringify(node));
				return (parseInt(node.anio_contable) === this.year);
			});

			this.entries = filteredNodes;
			callback();
		});
	}
}
