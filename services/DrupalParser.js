export default class DrupalParser {
	constructor(rawData) {
		this.rawData = rawData;
	}

	simplify() {
		let result = {};

		let relevantFields = Object.keys(this.rawData)
			.filter((key) => {
				return key.startsWith("field_");
			})
			.concat("nid", "title");
		relevantFields.forEach((fieldName) => {
			value = this.get(fieldName);
			if (value !== null) {
				result[fieldName.replace("field_", "")] = value;
			}
		});
		return result;
	}

	get(fieldName) {
		return this.getRawField(fieldName) || this.getLocalizedField(fieldName);
	}

	getRawField(fieldName) {
		let value = this.rawData[fieldName];
		if (typeof value === "string" || value instanceof String) {
			return value;
		}
	}

	getLocalizedField(fieldName) {
		if (
			this.rawData === [] ||
			this.rawData[fieldName] === undefined ||
			this.rawData[fieldName]["und"] === undefined ||
			this.rawData[fieldName]["und"][0] === undefined
		) {
			return null;
		}

		let info = this.rawData[fieldName]["und"][0];
		return info["value"] || info["tid"] || info["uri"] || info["target_id"];
	}
}
