import { USER_ADD_BAG_FAIL, USER_ADD_BAG_REQUEST, USER_ADD_BAG_SUCCESS, USER_CALL_BAG_FAIL, USER_CALL_BAG_REQUEST, USER_CALL_BAG_SUCCESS, USER_DELETE_BAG_FAIL, USER_DELETE_BAG_REQUEST, USER_DELETE_BAG_SUCCESS } from "../constants/cartConstants"

const initialState = {
    loading: false,
    success: null,
    error: null,
    bagListLoading: false,
    bagList: [],
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_ADD_BAG_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_ADD_BAG_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: null,
            }
        case USER_ADD_BAG_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error
            }
        case USER_DELETE_BAG_REQUEST:
            return {
                ...state,
                bagListLoading: true,
                success: null,
                error: null,
            }
        case USER_DELETE_BAG_SUCCESS:
            return {
                ...state,
                bagList: action.payload.bagList,
                bagListLoading: false,
                success: action.success,
                error: null,
            }
        case USER_DELETE_BAG_FAIL:
            return {
                ...state,
                bagListLoading: false,
                success: null,
                error: action.error
            }
        case USER_CALL_BAG_REQUEST:
            return {
                ...state,
                bagListLoading: true,
                success: null,
                error: null,
            }
        case USER_CALL_BAG_SUCCESS:
            return {
                ...state,
                bagListLoading: false,
                success: action.success,
                bagList: action.payload.bagList,
                error: null,
            }
        case USER_CALL_BAG_FAIL:
            return {
                ...state,
                bagListLoading: false,
                loading: false,
                success: null,
                error: action.error,
            }
        default:
            return state
        }
    }

export default cartReducer