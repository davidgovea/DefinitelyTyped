import { Future } from './index';

export function fiber<T = any>(iterator: IterableIterator<T>): Future<T>;
