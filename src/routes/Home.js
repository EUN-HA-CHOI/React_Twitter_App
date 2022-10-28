import React, { useEffect, useState } from 'react'
import {db,storage} from 'fbase' 
import {collection, addDoc, query, getDocs,onSnapshot, orderBy  } from "firebase/firestore";
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid'; //js6에서 쓰이는 거
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import TweetFactory from 'components/TweetFactory';


function Home({userObj}) {
  //console.log(userObj);
  const [tweets, setTweets] = useState([]); //문서 배열 형태로 불러오기
  
  /*const getTweets = async () => {  //따로 만들고 useEffect 에서 실행
    const q = query(collection(db, "tweets")); //컬렉션에서 query를 사용하여 문서를 가져온다.
    const querySnapshot = await getDocs(q); //querySnapshot 이란 문서를 사진형으로 내보내주는역할
    querySnapshot.forEach((doc) => { //querySnapshot에 문서가 있음
      //console.log(doc.id, " => ", doc.data()); 
      //setTweets(prev => [doc.data(), ...prev]) //새 트윗을 가장 먼저 보여진다.
      const tweetObject = {...doc.data(), id:doc.id } //...doc.data() 값 중 문서의 id 추가
      setTweets(prev => [tweetObject, ...prev]); //그럼 setTweets에 tweetObject 새로운 문서들을 가져온다.
    });
  }
*/

  useEffect(() => { //실시간 데이터 베이스 문서들 가져오기
   //getTweets();
    const q = query(collection(db, "tweets"),
              orderBy("createAt","desc"));  //내림차순
              
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
       const newArray = [];
      querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id});  //문서 데이터를 다 가져오고 문서 id도 같이 추가 하고  newArray로 내보내준다.
      });
       //console.log(newArray);
       setTweets(newArray);
    });
  },[]);
   
  //console.log(tweets);

 
  return (
    <div className='container'>
  <TweetFactory userObj = {userObj}/>
     <div style={{marginTop:30}}>
      {tweets.map (tweet => (
        <Tweet 
          key = {tweet.id}
          tweetObj = {tweet}
          isOwner = {tweet.createId === userObj.uid}
        />
      ))}
     </div>
    </div>
 
  )
}

export default Home