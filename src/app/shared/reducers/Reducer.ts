/**
 * @author Kent Bull
 */
import {Observable} from 'rxjs';

export type Reducer<T> = (state: T, action: Action) => T;

export interface Action {
    type: string;
    payload?: any;
}

export type Selector<T, V> = (state: Observable<T>) => Observable<V>;
