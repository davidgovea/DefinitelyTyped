import { Future } from 'posterus';
import { fiber } from 'posterus/fiber';

const future = new Future<string>();
future.settle(undefined, 'result');
// $ExpectError
future.settle(undefined, 10);

const undefinedResult = Future.fromResult();

const futureString = future.mapResult<string>(() => 'result');

// $ExpectError
const futureWrongType = future.mapResult<string>(() => 9000);

function* generatorTask() {
    yield Promise.resolve();
    return Promise.resolve(10);
}
const task = fiber(generatorTask())
    .mapResult(res => 11)
    .finally(() => ({}));
