import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DUPLICATE_USERNAME_REQUEST, USER_DUPLICATE_USERNAME_SUCCESS, USER_DUPLICATE_USERNAME_FAIL, USER_DUPLICATE_EMAIL_REQUEST, USER_DUPLICATE_EMAIL_SUCCESS, USER_DUPLICATE_EMAIL_FAIL, USER_RESET_EMAIL_DUPLICATE_CHECK, USER_RESET_USERNAME_DUPLICATE_CHECK, USER_ERROR_SUCCESS_RESET, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../constants/userConstants"


const initialState = {
    loading: false,
    success: null,
    error: null,
    isEmailDupChecked: false,
    isUsernameDupChecked: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: null
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error,
            }
        case USER_DUPLICATE_USERNAME_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_DUPLICATE_USERNAME_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: null,
                isUsernameDupChecked: true
            }
        case USER_DUPLICATE_USERNAME_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error
            }
        case USER_DUPLICATE_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_DUPLICATE_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.success,
                error: null,
                isEmailDupChecked: true
            }
        case USER_DUPLICATE_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error,
            }
        case USER_RESET_EMAIL_DUPLICATE_CHECK:
            return {
                ...state,
                isEmailDupChecked: false
            }
        case USER_RESET_USERNAME_DUPLICATE_CHECK:
            return {
                ...state,
                isUsernameDupChecked: false
            }
        case USER_ERROR_SUCCESS_RESET:
            return {
                ...state,
                success: null,
                error: null
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.error,
            }
        default:
            return state
    }
}

export default userReducer