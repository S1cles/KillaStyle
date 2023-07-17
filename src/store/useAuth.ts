import { create } from 'zustand';
import { userCreate, userLogin } from '@/services/userService';
import { devtools } from 'zustand/middleware'
import { parseJwt } from '@/helpers/parseJwt';


const initialState = {
  isAuth: false,
  token: null,
  username: null,
  email: null,
  mongoId: null
};



const useAuth = create(devtools((set) => ({
  ...initialState,
  logIn: async (data: any) => {
    try {
      // Send a request to the server with authentication data
      const response = await fetch(userLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        const { email, username, mongoId } = parseJwt(userData.token)
        set({
          isAuth: true,
          token: userData.token,
          username,
          email,
          mongoId
        }, false,
          { type: 'logIn' },);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.log(error);
    }
  },

  signUp: async (data: any) => {
    try {

      const response = await fetch(userCreate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        const { email, username, mongoId } = parseJwt(userData.token);
        set(
          {
            isAuth: true,
            token: userData.token,
            username,
            email,
            mongoId
          },
          false,
          { type: 'signUp' }
        );
      } else {
        throw new Error('Sign up failed');
      }
    } catch (error) {
      console.log(error);
    }
  },

  // verifyToken: () => {
  //   try {
  //     const token = useAuth.getState().token;
  //     if (token) {
  //       const { exp } = parseJwt(token);
  //       const currentTime = Date.now() / 1000;
  //       if (exp && currentTime >= exp) {
  //         useAuth.getState().logOut();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },


  logOut: () => set(initialState, false,
    { type: 'logOut' },),
})));





export default useAuth;
