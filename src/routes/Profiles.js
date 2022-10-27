import React, { useEffect, useState } from 'react'
import {authService,db} from 'fbase';
import {useNavigate } from 'react-router-dom';
import {collection, query, getDocs, where ,orderBy } from "firebase/firestore";
import Tweet from 'components/Tweet';
import { updateProfile } from "firebase/auth";


function Profiles({userObj}) {
  const [tweets, setTweets] = useState([]);
  const Navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    Navigate('/'); //홈으로 이동 즉 리다이렉트 기능이다.
  }

  const getMyTweets = async () => {
    const q = query(collection(db, "tweets"),
                    where("createId", "==" ,userObj.uid),  //사용자와 uid가 같은가
                    orderBy("createAt", "desc")); //내림차순으로 바꿔줌,asc:오름차순 ->최근시간이 위로
    const querySnapshot = await getDocs(q);
    const newArray = [];
    querySnapshot.forEach((doc) => { 
      newArray.push({...doc.data(), id:doc.id }) //문서 id 추가하여 tweetObject에 넣어준다. 
    });
    setTweets(newArray);
  }

  useEffect(() => {
    getMyTweets();
  },[]);
  

  const onChange = e => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName != newDisplayName) {
      await updateProfile(userObj, {displayName: newDisplayName, photoURL: "" });
    }
  }

  return (
    <>
    <form onSubmit={onSubmit} >
      <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName}/>
      <input type="submit" value="Update Profile" />
    </form>
    <button onClick={onLogOutClick}>Log Out</button>
    <div>
      {tweets.map (tweet => (
        <Tweet 
          key = {tweet.id}
          tweetObj = {tweet}
          isOwner = {tweet.createId === userObj.uid}
        />
      ))}
    </div>
    </>
  )
}

export default Profiles