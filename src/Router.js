import Navigation from 'components/Navigation';
import React, { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profiles from 'routes/Profiles';

function AppRouter({isLoggedIn,userObj }) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {isLoggedIn && < Navigation userObj={userObj}/>} 
      <Routes>       
        {isLoggedIn ? (
          <>
           <Route path='/' element={<Home userObj={userObj} />}/>
           <Route path='/profile' element={<Profiles userObj={userObj} />} />
          </>
        ) : (
        <Route path='/' element={<Auth/>}/>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
//로그인시 true -> Home 화면 , 로그인 안되면 false -> Auth 화면 뜸
// && 연산자 : isLoggedIn 가 true 이면 < Navigation /> 실행해라 (삼항연산자 보다 간단하게 사용됨.)