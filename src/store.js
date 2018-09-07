import {createStore, combineReducers} from 'redux'
import {VERSION, CONSTRAINT} from './actions';
import semver from './semver';

const initialState = {
    version: { version: '', semver: null},
    constraint: { constraint: '', semver: null},
};

const version = (state = { version: '', semver: null}, action) => {
    if (action.type === VERSION) {
        const cleaned = semver.clean(action.version);

        return {
            ...state,
            version: action.version,
            semver: semver.coerce(cleaned)
        };
    }

    return state;
};

const constraint = (state = { constraint: '', semver: null}, action) => {
    if (action.type === CONSTRAINT) {
        const cleaned = action.constraint.trim().replace(/v(\d+\.)/gi, '$1').replace(/=(\d+\.)/g, '$1');

        return {
            ...state,
            constraint: action.constraint,
            semver: semver.coerceRange(cleaned),
        };
    }

    return state;
};

const reducers = combineReducers({
    version,
    constraint,
});

export default createStore(
    reducers,
    initialState,
    process.env.NODE_ENV !== 'production'
        && window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__()
);