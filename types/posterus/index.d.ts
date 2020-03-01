// Type definitions for posterus 0.4
// Project: https://github.com/Mitranim/posterus#readme
// Definitions by: David Govea <https://github.com/DefinitelyTyped>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

export namespace Posterus {
    class Future<T = any, E extends Error = Error> {
        map: <U = any, V extends Error = Error>(
            mapper: (error?: E, result?: T) => U | Promise<U> | Future<U, V>,
        ) => Future<U, V>;
        mapResult: <U = any, V extends Error = Error>(
            mapper: (result: T) => U | Promise<U> | Future<U, V>,
        ) => Future<U, V>;
        mapError: <U = any, V extends Error = Error>(
            mapper: (error: E) => U | Promise<U> | Future<U, V>,
        ) => Future<U, V>;
        finally: (mapper: (error?: E, result?: T) => any) => Future<T, E>;
        deinit: () => void;
        weak: () => Future<T, E>;
        settle: (error?: E, result?: T) => void;
        toPromise: () => Promise<T>;
        then: Promise<T>['then'];
        catch: Promise<T>['catch'];
        finishPending: () => void;
        deref: () => T | undefined;
    }

    interface FutureConstructor {
        readonly prototype: Future;
        // tslint:disable-next-line no-unnecessary-generics
        new <T = any, E extends Error = Error>(): Future<T, E>;
        from: <T = any, E extends Error = Error>(result?: T, error?: E) => Future<T, E>;
        fromResult: <T = any>(...args: T extends undefined ? [] | [undefined] : [T]) => Future<T>;
        fromError: <E extends Error = Error>(error: E) => Future<undefined, E>;
        fromPromise: <T>(promise: Promise<T>) => Future<T>;
        all: (values: any[]) => Future;
        race: (values: any[]) => Future;
    }
}

export type Future<T = any, E extends Error = Error> = Posterus.Future<T, E>;
export const Future: Posterus.FutureConstructor;
export function isFuture(value: any): boolean;
export function isDeinitError(error: any): boolean;
