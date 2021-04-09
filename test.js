import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import pMapSeries from './index.js';

const fixtureError = new Error('fixture');

test('main', async t => {
	let index = 0;
	const delayMs = 100;
	const end = timeSpan();
	const input = [Promise.resolve(1), 2, 3, Promise.resolve(4)];

	const mappedValues = await pMapSeries(input, async (value, currentIndex) => {
		t.is(value, currentIndex + 1);
		t.is(index, currentIndex);
		index++;
		await delay(delayMs);
		return value * 10;
	});

	t.deepEqual(mappedValues, [10, 20, 30, 40]);
	t.true(end() > (delayMs - 20));
});

test('rejection input rejects the promise', async t => {
	await t.throwsAsync(
		pMapSeries([1, Promise.reject(fixtureError)], () => {}),
		{message: fixtureError.message}
	);

	await t.throwsAsync(
		pMapSeries([1, Promise.resolve(2)], async () => {
			throw fixtureError;
		}),
		{message: fixtureError.message}
	);
});

test('handles empty iterable', async t => {
	t.deepEqual(await pMapSeries([]), []);
});
