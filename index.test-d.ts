import {expectType} from 'tsd';
import pMapSeries = require('.');

const keywords = [Promise.resolve('foo'), 'rainbow', 'pony'];

expectType<Promise<{keyword: string; index: number}[]>>(
	pMapSeries(keywords, (keyword, index) => ({keyword, index}))
);
expectType<Promise<{keyword: string; index: number}[]>>(
	pMapSeries(keywords, async (keyword, index) => ({keyword, index}))
);
expectType<Promise<{keyword: string; index: number}[]>>(
	pMapSeries(new Set(keywords), async (keyword, index) => ({keyword, index}))
);
