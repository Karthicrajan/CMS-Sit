import { createSlice } from '@reduxjs/toolkit';
  import axios from 'axios';
import { useDispatch } from 'react-redux';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: null,
      isAuthenticated: false,
    },
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      },
      clearToken: (state) => {
        state.token = null;
        state.isAuthenticated = false;
      },
    },
  });
export const loginFunction = async (user,passcode) =>{
    
    try{
        const res = await axios.post("http://localhost:5000/api/auth/login",{
            userName:user,
            password:passcode,
        });
        console.log(res);
        return res.data;
    }catch(err){
        console.log(err);
    }
}
export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;