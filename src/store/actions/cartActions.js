import { USER_ADD_BAG_FAIL, USER_ADD_BAG_REQUEST, USER_ADD_BAG_SUCCESS } from "../constants/cartConstants"

export const addCart = (item_name) => async (dispatch) => {
    try {
      dispatch({ type: USER_ADD_BAG_REQUEST })
  
      const config = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(item_name)
      }
  
      const res = await fetch(`/users/add_bag`, config)
  
      if(res.status === 200) {
        dispatch({
          type: USER_ADD_BAG_SUCCESS,
          success: "장바구니에 물품을 추가하였습니다."
        })
      } else {
        throw new Error()
      }
  
    } catch (err) {
      dispatch({
          type: USER_ADD_BAG_FAIL,
          error: "에러가 발생했습니다. 다시 시도해주세요" 
        })
    }
  }