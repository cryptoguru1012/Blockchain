import {
    CATEGORY_REQ_ERR,
    CATEGORY_REQ_START,
    CATEGORY_REQ_SUCCESS
} from '../../actions/store/category';

const initialState = {
    loading: false,
    error: null,
    success: false,
    message: '',
    categories: []
};

export default function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case CATEGORY_REQ_START:
            return { ...state, loading: true };
        case CATEGORY_REQ_ERR:
            return { ...state, loading: false, error: true, message: action.message };
        case CATEGORY_REQ_SUCCESS:
            return { ...state, loading: false, success: true, categories: action.payload };
            
        default:
            return state;
    }
};
