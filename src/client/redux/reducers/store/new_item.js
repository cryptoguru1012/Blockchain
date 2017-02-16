import {
    ITEM_CREATE_ERR,
    ITEM_CREATE_START,
    ITEM_CREATE_SUCCESS
} from '../../actions/store/new_item';

const initialState = {
    loading: false,
    error: null,
    success: false
};

export default function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case ITEM_CREATE_ERR:
            return {
                ...state,
                error: true
            };
            
        case ITEM_CREATE_START:
            return {
                ...state,
                loading: true
            };
            
        case ITEM_CREATE_SUCCESS:
            return {
                ...state,
                success: true
            };
            
        default:
            return {
                ...state
            };
    }
};
