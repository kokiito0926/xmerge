#!/usr/bin/env node

// >> $ ./index.js ./aaaa.xml ./bbbb.xml > ./cccc.xml

import { fs, path, stdin, argv } from "zx";
import { parseStringPromise, Builder } from "xml2js";
import _ from "lodash";

if (argv._.length < 2) {
	process.exit(1);
}

const [basePath, patchPath] = argv._;

const baseRaw = await fs.readFile(basePath, "utf-8");
const patchRaw = await fs.readFile(patchPath, "utf-8");

const baseObj = await parseStringPromise(baseRaw);
const patchObj = await parseStringPromise(patchRaw);

const customizer = (objValue, srcValue) => {
	if (_.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
};

const mergedObj = _.mergeWith({}, baseObj, patchObj, customizer);

const builder = new Builder();
const xml = builder.buildObject(mergedObj);

console.log(xml);
