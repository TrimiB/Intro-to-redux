const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function AccountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount,
    };

  // Middleware
  return async function (dispatch, getState) {
    // Frankfurter API Call
    try {
      dispatch({ type: 'account/convertingCurrency' });

      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      console.log(response);

      if (response.status !== 200)
        throw new Error('Something went wrong while fetching data from the deposit function');

      const data = await response.json();
      const convertedRate = data.rates.USD;

      // return action
      dispatch({
        type: 'account/deposit',
        payload: convertedRate,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount,
  };
}

export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return {
    type: 'account/payLoan',
  };
}
