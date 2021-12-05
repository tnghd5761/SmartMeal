import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DUPLICATE_USERNAME_REQUEST, USER_DUPLICATE_USERNAME_SUCCESS, USER_DUPLICATE_USERNAME_FAIL, USER_DUPLICATE_EMAIL_REQUEST, USER_DUPLICATE_EMAIL_SUCCESS, USER_DUPLICATE_EMAIL_FAIL, USER_RESET_EMAIL_DUPLICATE_CHECK, USER_RESET_USERNAME_DUPLICATE_CHECK, USER_ERROR_SUCCESS_RESET, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL, USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAIL, USER_INFO_UPDATE_REQUEST, USER_INFO_UPDATE_SUCCESS, USER_INFO_UPDATE_FAIL, } from "../constants/userConstants"

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
  
      const res = await fetch(`/users/sign_up`, config)
  
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


// @desc      Login
// @request   /users/login
// @response  
export const login = (submittedUserData) => async (dispatch) => {
  try {
    
    dispatch({ type: USER_LOGIN_REQUEST })
      
    const config = {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(submittedUserData)
    }
    
    const res = await fetch(`users/login`, config)

    if(res.status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
      })
    } else if (res.status === 404){
      dispatch({
        type: USER_LOGIN_FAIL,
        error: "존재하지 않는 사용자입니다." 
      })
    } else if (res.status === 401){
      dispatch({
        type: USER_LOGIN_FAIL,
        error: "비밀번호가 일치하지 않습니다. "
      })
    } else {
      throw new Error()
    }

  } catch (err) {
    dispatch({
        type: USER_LOGIN_FAIL,
        error: "에러가 발생했습니다. 다시 시도해주세요" 
      })
  }
}

// @desc      Logout
// @request   /users/logout
// @response  
export const logout = () => async (dispatch) => {
  try {
    
    dispatch({ type: USER_LOGOUT_REQUEST })
      
    const config = {
      method:'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    }
    
    await fetch(`users/logout`, config)
    dispatch({type: USER_LOGOUT_SUCCESS})
    dispatch({type: USER_ERROR_SUCCESS_RESET})
    dispatch({type: USER_RESET_EMAIL_DUPLICATE_CHECK})
    dispatch({type: USER_RESET_USERNAME_DUPLICATE_CHECK})


  } catch (err) {
    dispatch({
        type: USER_LOGOUT_FAIL,
        error: "에러가 발생했습니다. 다시 시도해주세요" 
      })
  }
}

export const info = () => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_REQUEST })

    const config = {
      method:'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    }

    const res = await fetch(`/users/info`, config)  
    const { userList } = await res.json()

    if(res.status === 200) {
      dispatch({
        type: USER_INFO_SUCCESS,
        payload:{ userList },
      })
    } else {
      throw new Error()
    }

  } catch (err) {
    dispatch({
        type: USER_INFO_FAIL,
        error: "에러가 발생했습니다. 다시 시도해주세요" 
      })
  }
}

export const infoUpdate = (updateUserData) => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_UPDATE_REQUEST })

    const config = {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(updateUserData)
    }

    const res = await fetch(`/users/update`, config)
    const { userList } = await res.json()

    if(res.status === 200) {
      dispatch({
        type: USER_INFO_UPDATE_SUCCESS,
        success: "회원정보 수정이 완료되었습니다"
      })
    } else if(res.status === 409){
      dispatch({
        type: USER_INFO_UPDATE_FAIL,
        error: "회원정보 수정에 실패하였습니다. 입력한 내용을 다시 확인해주세요" 
      })
    } else {
      throw new Error()
    }

  } catch (err) {
    dispatch({
        type: USER_INFO_UPDATE_FAIL,
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