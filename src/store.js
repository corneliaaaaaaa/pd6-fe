import thunk from 'redux-thunk';
import reducer from './reducers';

import { createStore, applyMiddleware } from 'redux';

export const store = createStore(reducer, applyMiddleware(thunk));
