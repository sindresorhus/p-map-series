/**
Map over promises serially.

@param input - Mapped over serially in the `mapper` function.
@param mapper - Expected to return a value. If it's a `Promise`, it's awaited before continuing with the next iteration.
@returns Fulfills when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject.

@example
```
import pMapSeries from 'p-map-series';

const keywords = [
	getTopKeyword() //=> Promise
	'rainbow',
	'pony'
];

let scores = [];

const mapper = async keyword => {
	const score = await fetchScore(keyword);
	scores.push(score);
	return {keyword, score};
});

console.log(await pMapSeries(keywords, mapper));
// [
// 	{
// 		keyword: 'unicorn',
// 		score: 99
// 	},
// 	{
// 		keyword: 'rainbow',
// 		score: 70
// 	},
// 	{
// 		keyword: 'pony',
// 		score: 79
// 	}
// ]
```
*/
export default function pMapSeries<ValueType, MappedValueType>(
	input: Iterable<PromiseLike<ValueType> | ValueType>,
	mapper: (
		element: ValueType,
		index: number
	) => PromiseLike<MappedValueType> | MappedValueType
): Promise<MappedValueType[]>;
