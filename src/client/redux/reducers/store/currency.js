import {
    CURRENCY_REQ_ERR,
    CURRENCY_REQ_START,
    CURRENCY_REQ_SUCCESS
} from '../../actions/store/currency';

const initialState = {
    loading: false,
    error: null,
    success: false,
    currencies: []
};

export default function currencyReducer(state = initialState, action) {
    switch(action.type) {
        case CURRENCY_REQ_START:
            return { ...state, loading: true };
        case CURRENCY_REQ_ERR:
            return { ...state, error: true };
        case CURRENCY_REQ_SUCCESS:
            return { ...state, success: true, currencies: action.payload };
            
        default:
            return state;
    }
};
