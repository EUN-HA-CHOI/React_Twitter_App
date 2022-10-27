import React, { useEffect, useState } from 'react';
import {db,storage} from 'fbase';
import { doc, deleteDoc,updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

function Tweet({tweetObj,isOwner}) { //구조분해할당으로 텍스트 값만 나오게 함
 const [editing, setEditing] = useState(false);
 const [newTweet, setNewTweet] = useState(tweetObj.text);
 const [nowDate, setNowDate] = useState(tweetObj.createAt);

 const onDeleteClick = async () => {
  const ok = window.confirm("삭제하시겠습니까?");
  if(ok) {
    //console.log(tweetObj.id);
    //const data = await db.doc(`tweets/${tweetObj.id}`);
    const data = await deleteDoc(doc(db, "tweets", `/${tweetObj.id}`)); //id:문서아이디,슬래시는 폴더 밑에 문서라는 뜻
    //console.log(data);
    if(tweetObj.attachmentUrl !== "") {
      const deleteRef = ref(storage, tweetObj.attachmentUrl);
      await deleteObject(deleteRef)
    }
  }
 }
  
 const toggleEditing = () => {
  setEditing((prev) => !prev);  //setEditing 처음에 false를 true 로 바꿔줌 렌더링됨 
 }

 const onChange = e => {
  const {target: {value}} = e;
  setNewTweet(value);
}

const onSubmit = async (e) => { //문서 아이디에 해당하는 텍스트 필드를 바꿔주기
  e.preventDefault();
  //console.log(tweetObj.id, newTweet);
  const newTweetRef = doc(db, "tweets", `/${tweetObj.id}`); //데이터컬렉션 이름:tweets
  await updateDoc(newTweetRef,{
    text: newTweet, 
    createAt: Date.now()
  });  //해당하는 문서아이디를 텍스트와 현재시간으로 업데이트 해줘라
  setEditing(false); //fales 로 되어서 렌더링으로 돼서 isOwner이 실행됨 
}
useEffect(() => {
  let timeStamp = tweetObj.createAt;
  const now = new Date(timeStamp);
  setNowDate(now.toUTCString());
},[]) 

  return (
    <div>
      {editing ? ( //수정화면 , true 로 바뀌어 아래의 코드가 보임
        <>
         <form onSubmit={onSubmit}>
          <input onChange={onChange} value={newTweet} required  />
          <input type="submit" value="update Tweet"/>
         </form>
         <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
       <>
        <h4>{tweetObj.text}</h4> 
        {tweetObj.attachmentUrl && (
          <img src={tweetObj.attachmentUrl} width="50" height="50" />
        )}
        <span>{nowDate}</span>
       {isOwner && (
        <>
         <button onClick={onDeleteClick}>Delete Tweet</button>
         <button onClick={toggleEditing}>Edit Tweet</button>
        </>
       )}
       </>
      )}
    </div>
  )
}

export default Tweet