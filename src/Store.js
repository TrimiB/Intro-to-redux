import { configureStore } from '@reduxjs/toolkit';
import CustomerReducer from './features/customers/customerSlice';
import AccountReducer from './features/accounts/accountSlice';

const store = configureStore({
  reducer: {
    account: AccountReducer,
    customer: CustomerReducer,
  },
});

export default store;
