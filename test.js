import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import m from './';

const fixtureErr = new Error('fixture');

test('main', async t => {
	let index = 0;
	const ms = 100;
	const end = timeSpan();
	const input = [Promise.resolve(1), 2, 3, Promise.resolve(4)];

	const val = await m(input, async (x, i) => {
		t.is(x, i + 1);
		t.is(index, i);
		index++;
		await delay(ms);
		return x * 10;
	});

	t.deepEqual(val, [10, 20, 30, 40]);
	t.true(end() > (ms - 20));
});

test('rejection input rejects the promise', async t => {
	t.throws(m([1, Promise.reject(fixtureErr)], () => {}), fixtureErr.message);
	t.throws(m([1, Promise.resolve(2)], () => Promise.reject(fixtureErr)), fixtureErr.message);
});

test('handles empty iterable', async t => {
	t.deepEqual(await m([]), []);
});
