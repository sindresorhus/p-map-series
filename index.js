'use strict';

const pMapSeries = async (iterable, mapper) => {
	const result = [];
	let index = 0;

	for (const value of iterable) {
		// eslint-disable-next-line no-await-in-loop
		result.push(await mapper(await value, index++));
	}

	return result;
};

module.exports = pMapSeries;
module.exports.default = pMapSeries;
