
import {GET_USER, USER_ERROR} from '../types'
import { APIKit } from '../../core/utils';

export const getUsers = (json) => async dispatch => {
    
    try{
          await APIKit.post('/Login/Logeo',json,{
            headers: {
              'Content-Type': 'application/json'
            }}).then(data => {
                 dispatch({
                     type: GET_USER,
                     payload: data.data
                 })
            });
    }
    catch(e){
        dispatch( {
            type: USER_ERROR,
            payload: console.log(e),
        })
    }

}


  