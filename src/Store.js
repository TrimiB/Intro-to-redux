import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import CustomerReducer from './features/customers/customerSlice';
import AccountReducer from './features/accounts/accountSlice';

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
