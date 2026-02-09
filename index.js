#!/usr/bin/env node

// >> $ ./index.js ./aaaa.xml ./bbbb.xml > ./cccc.xml

import { fs, argv } from "zx";
import xml2js from "xml2js";
import _ from "lodash";

async function isValidXML(str) {
	try {
		await xml2js.parseStringPromise(str);
		return true;
	} catch (err) {
		return false;
	}
}

const files = argv._;
if (files.length < 2) {
	process.exit(1);
}

let resultObj = {};
for (let i = 0; i < files.length; i++) {
	const file = files[i];
	if (!(await fs.pathExists(file))) {
		continue;
	}

	const content = await fs.readFile(file, "utf-8");
	if (!content) {
		continue;
	}

	if (!(await isValidXML(content))) {
		continue;
	}

	const currentObj = await xml2js.parseStringPromise(content);
	if (!currentObj) {
		continue;
	}

	if (i === 0) {
		resultObj = currentObj;
	} else {
		resultObj = _.mergeWith(resultObj, currentObj, (objValue, srcValue) => {
			if (_.isArray(objValue)) {
				return objValue.concat(srcValue);
			}
		});
	}
}

const builder = new xml2js.Builder({
	cdata: true,
	xmldec: { version: "1.0", encoding: "UTF-8" },
	renderOpts: { pretty: true },
});

const xml = builder.buildObject(resultObj);
console.log(xml);
