import { combineReducers, createStore } from 'redux';
import CustomerReducer from './features/customers/customerSlice';
import AccountReducer from './features/accounts/accountSlice';

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer,
});

const store = createStore(rootReducer);

export default store;
