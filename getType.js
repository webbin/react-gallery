function isObject(value) {
	const type = typeof value;
	return value != null && (type === "object" || type === "function");
}

function getType(data) {
	if (isObject(data)) {
		if (typeof data.length !== "undefined") {
			if (data.length > 0) {
				return `Array<${getType(data[0])}>`;
			} else {
				return "Array<any>";
			}
		}
		const keys = Object.keys(data);
		if (keys.length === 0) {
			return "object";
		}
		let a = Object.keys(data)
			.map((v) => {
				const type = getType(data[v]);
				return `${v}: ${type}`;
			})
			.join(",\n");
		a = `{\n${a}\n}`;
		return a;
	} else {
		return typeof data;
	}
}

const data = '{"state":0,"name":"Charles-N100","positionId":"real2.614113642930860032","model":"aqara.lock.bzacn4","did":"lumi.4cf8cdf3c878772"}';
const obj = JSON.parse(data);

console.log(getType(obj));