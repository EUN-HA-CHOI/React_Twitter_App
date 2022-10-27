import React, { useState } from 'react'
import {authService} from 'fbase';

import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from 'components/AuthForm';



function Auth() {
 
  const onSocialClick = (e) => {
    //console.log(e.target.name);
    const {target: {name}} = e;  //e 객체에서 클릭한 타겟을 가져옴
    let provider   //const 는 결과 값이 변경 되지 않음으로 let 사용
    if (name === "google") {
       provider = new GoogleAuthProvider(); //new 연산자를 붙여 GoogleAuthProvider 생성자 함수의 계정을 provider에 저장
    } else if(name === "github") {
       provider = new GithubAuthProvider();  
    }
    const data = signInWithPopup(authService, provider); // 팝업 창을 사용하여 로그인하려면 signInWithPopup을 호출
    //console.log(data);
    //로그아웃 하려면 firebase 에서 계정삭제 또는 개발자 모드에 애플리케이션의 로컬 스토리지 값 삭제하면 로그아웃됨
  }
  return (
    <div>
      <AuthForm />
       <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
       </div>
    </div>
   
  )
}

export default Auth
//newAccount 값이 초기값이 true 이기에 toggle버튼을 누르면 값이 바뀜
