import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DUPLICATE_USERNAME_REQUEST, USER_DUPLICATE_USERNAME_SUCCESS, USER_DUPLICATE_USERNAME_FAIL, USER_DUPLICATE_EMAIL_REQUEST, USER_DUPLICATE_EMAIL_SUCCESS, USER_DUPLICATE_EMAIL_FAIL, USER_RESET_EMAIL_DUPLICATE_CHECK, USER_RESET_USERNAME_DUPLICATE_CHECK, USER_ERROR_SUCCESS_RESET,  } from "../constants/userConstants"

// @desc      Sign up
// @request   /users/signup
// @response  { }
export const signup = (submittedUserData) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })
  
      const config = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(submittedUserData)
      }
  
      const res = await fetch(`/users/signup`, config)
  
      if(res.status === 200) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          success: "입력하신 이메일로 인증링크를 보내드렸습니다"
        })
      } else if(res.status === 409){
        dispatch({
          type: USER_REGISTER_FAIL,
          error: "회원가입에 실패하였습니다. 입력한 내용을 다시 확인해주세요" 
        })
      } else {
        throw new Error()
      }
  
    } catch (err) {
      dispatch({
          type: USER_REGISTER_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
  }


// @desc      Checking if duplicated username
// @request   /api/auth/dup/username
// @response  { }
export const checkIsDuplicateUsername = (user_name) => async (dispatch) => {
    try {
      dispatch({ type: USER_DUPLICATE_USERNAME_REQUEST })
  
      const config = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({ user_name })
      }
  
      const res = await fetch(`users/check_name`, config)
  
      if(res.status === 200) {
        dispatch({ 
          type: USER_DUPLICATE_USERNAME_SUCCESS,
          success: "사용가능한 유저이름 입니다."
        })
      } else if(res.status === 409){
        dispatch({
          type: USER_DUPLICATE_USERNAME_FAIL,
          error: "이미 존재하는 유저이름 입니다. 다른 유저이름을 입력해주세요" 
        })
      } else {
        throw new Error()
      }
  
    } catch (err) {
      dispatch({
          type: USER_DUPLICATE_USERNAME_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
}
  

// @desc      Checking if duplicated email/id
// @request   /api/auth/dup/email
// @response  { }
export const checkIsDuplicateEmail = (user_id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DUPLICATE_EMAIL_REQUEST })
  
      const config = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({ user_id })
      }
  
      const res = await fetch(`users/check_id`, config)
  
      if(res.status === 200) {
        dispatch({ 
          type: USER_DUPLICATE_EMAIL_SUCCESS,
          success: "사용가능한 이메일 입니다"
        })
      } else if(res.status === 409){
        dispatch({
          type: USER_DUPLICATE_EMAIL_FAIL,
          error: "이미 가입된 이메일 입니다. 다른 이메일을 입력해주세요" 
        })
      } else {
        throw new Error()
      }
  
    } catch (err) {
      dispatch({
          type: USER_DUPLICATE_EMAIL_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
}

// @desc      For reset error, success in reducer
export const resetErrorSuccess = () => (dispatch) => {
    dispatch({ type: USER_ERROR_SUCCESS_RESET })
}

// @desc      For reset isEmailDupChecked in reducer
export const resetEmailDuplicateCheck = () => (dispatch) => {
    dispatch({ type: USER_RESET_EMAIL_DUPLICATE_CHECK })
}

// @desc      For reset isUsernameDupChecked in reducer
export const resetUsernameDuplicateCheck = () => (dispatch) => {
    dispatch({ type: USER_RESET_USERNAME_DUPLICATE_CHECK })
}