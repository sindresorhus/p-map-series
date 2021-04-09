import {expectType} from 'tsd';
import pMapSeries from './index.js';

const keywords = [Promise.resolve('foo'), 'rainbow', 'pony'];

expectType<Promise<Array<{keyword: string; index: number}>>>(
	pMapSeries(keywords, (keyword, index) => ({keyword, index}))
);
expectType<Promise<Array<{keyword: string; index: number}>>>(
	pMapSeries(keywords, async (keyword, index) => ({keyword, index}))
);
expectType<Promise<Array<{keyword: string; index: number}>>>(
	pMapSeries(new Set(keywords), async (keyword, index) => ({keyword, index}))
);
