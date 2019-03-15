'use strict';

const pMapSeries = async (iterable, mapper) => {
	const result = [];
	let index = 0;

	for (const value of iterable) {
		// eslint-disable-next-line no-await-in-loop
		const mappedValue = await mapper(await value, index++);
		result.push(mappedValue);
	}

	return Promise.all(result);
};

module.exports = pMapSeries;
module.exports.default = pMapSeries;
