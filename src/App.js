import React, { useEffect, useState } from 'react';
import AppRouter from 'Router';
import { authService } from 'fbase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] =useState(null); //로그인한 사용자 정보

  useEffect(() => { //home 컴포넌트에서 async await 에 의한 결과를 받으면 useEffect 실행 할 수 있음
    onAuthStateChanged(authService, (user) => { // 그럼 로그인에 대한 사용자 정보를 onAuthStateChanged 함수에 의해 user에 저장됨
      console.log(user);
      if (user) { //값이 있으면 true 고, setIsLoggedIn에 값이 전달됨
        //user is signed in
        setIsLoggedIn(user);
        setUserObj(user);
        //const uid = user.uid; 로그인 됨(=true)
  
      } else { // 값이 없고 false 이면 setIsLoggedIn에 전달(로그아웃)
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  //console.log(authService.currentUser);//currentUser는 현재 로그인한 사람 확인 함수

  return ( //init이 true면 isLoggedIn에 정보 전달 
    <>
    {init ? <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj} /> : "initializing..."}
    <footer>&copy; {new Date().getFullYear()} Twitter app</footer>
    </>
  );
}

export default App;