import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './components/context';
import Navigator from './routes/drawer';
import Login from './screens/login';
import { apiLoginConnection } from './shared/globalValues';

export default function App({ navigation }) {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    verification: null,
    role: 0
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          verification: action.verification,
          userName: action.userName,
          role: action.role,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          verification: null,
          role: 0,
          isLoading: false
        };
      case 'RETRIEVE_VERIFICATION':
        return {
          ...prevState,
          userName: action.userName,
          verification: action.verification,
          role: action.role,
          isLoading: false
        };
      case 'IS_LOADING':
        return {
          ...prevState,
          isLoading: true
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  async function loginAsync(userName, password) {
    var body = {
      userName: userName,
      password: password,
      verification: 'string',
      role: 1
    }

    var res = await fetch(apiLoginConnection + "Login/", {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
        //'Origin': apiTaskOrigin
      }
    });
    var resp = await res.json();
    return resp;
  }

  async function logoutAsync(userName, verification) {
    var body = {
      userName: userName,
      verification: verification
    }

    var res = await fetch(apiLoginConnection + "logout/", {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
        //'Origin': apiTaskOrigin
      }
    });
    var resp = await res.json();
    return resp;
  }

  async function verifyAsync(userName, verification) {
    var body = {
      userName: userName,
      verification: verification
    }

    var res = await fetch(apiLoginConnection + "Verify/", {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
        //'Origin': apiTaskOrigin
      }
    });
    var resp = await res.json();
    return resp;
  }

  const authContext = useMemo(() => ({
    signIn: async (userName, password) => {
      var result = await loginAsync(userName, password);
      if (result != null) {
        try {
          await AsyncStorage.setItem('userName', result.userName)
          await AsyncStorage.setItem('verification', result.verification)
          await AsyncStorage.setItem('role', result.role)
        }
        catch (e) {
          console.log(e)
        }
        dispatch({ type: 'LOGIN', userName: result.userName, verification: result.verification, role: result.role })
      }
      else console.log('else')
    },
    signOut: async (userName, verification) => {
      try {
        await AsyncStorage.setItem('userName', null)
        await AsyncStorage.setItem('verification', null)
        await AsyncStorage.setItem('role', 0)
      }
      catch (e) {
        console.log(e)
      }
      var result = await logoutAsync(userName, verification);
      dispatch({ type: 'LOGOUT' })
    },
    verification: async (userName, verification) => {
      var result = await verifyAsync(userName, verification)
      if (result != null) {
        try {
          await AsyncStorage.setItem('userName', result.userName)
          await AsyncStorage.setItem('verification', result.verification)
          await AsyncStorage.setItem('role', result.role)
        }
        catch (e) {
          console.log(e)
        }
        dispatch({ type: 'RETRIEVE_VERIFICATION', userName: result.userName, verification: result.verification, role: result.role })
      }
      else {
        try {
          await AsyncStorage.setItem('userName', null)
          await AsyncStorage.setItem('verification', null)
          await AsyncStorage.setItem('role', 0)
        }
        catch (e) {
          console.log(e);
        }
      }
    }
  }), []);

  useEffect(() => {
    var userName;
    var verification;
    var role;
    async function OnLoad() {
      try {
        userName = await AsyncStorage.getItem('userName')
        verification = await AsyncStorage.getItem('verification');
        role = await AsyncStorage.getItem('role');
        dispatch({ type: 'RETRIEVE_VERIFICATION', userName: userName, verification: verification, role: role })
        console.log(loginState.userName)
        console.log(loginState.verification)
      }
      catch (e) {
        console.log(e);
      }
    }
    OnLoad();
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userName == null && loginState.verification == null && <Login />}
      {loginState.userName != null && loginState.verification != null && <Navigator />}
    </AuthContext.Provider>
  );
}
