import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {themeReducer} from './reducers/ThemeReducer';
import {categoryReducer} from './reducers/CategoryReducer';

const rootReducer = combineReducers({
    dark:themeReducer,
    id:categoryReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunk));