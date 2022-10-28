import React, { useState } from 'react'
import {db,storage} from 'fbase' 
import {collection, addDoc, query, getDocs,onSnapshot, orderBy  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid'; //js6에서 쓰이는 거
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { faPlus,faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "styles/tweetfactory.scss";

function TweetFactory({userObj}) {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");//이미지 url 넣어주는곳  
 
  const onChange = e => {
    //console.log(e.target.value);
    const {target: {value}} = e;
    setTweet(value);
   }
 
   const onSubmit = async(e) => {
     e.preventDefault(); //새로고침방지
     let attachmentUrl ="" //변수에 저장
      if (attachment !== "") {
       const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);//ref(파일경로),로그인한 사용자정보를 폴더로 만들고,uuidv4 파일이름 id 생성 = 파일경로가됨 
       const response = await uploadString(storageRef,attachment ,'data_url'); //storageRef경로에서 attachment 사진 파일을 url로 업로드되는곳 
       //console.log(response);
       attachmentUrl = await getDownloadURL(ref(storage, response.ref)) //response에 업로드된 파일이 ref속성에 다운로드 되어야됨
      }
 
     await addDoc(collection(db, "tweets"), { //tweets라는 이름이 addDoc에 의해 자동으로 문서 추가됨
       text: tweet,     //객체 하나가 문서임
       createAt: Date.now(), 
       createId: userObj.uid,
       attachmentUrl,  //attachmentUrl :attachmentUrl 키와값이 값을 때 하나만 써준다 
     });
     setTweet(""); //입력과 동시에 비워줌
     setAttachment(""); 
   }
   
   const onFileChange = e => { //브라우저에서 사진파일 출력하기
     console.log(e.target.files);
     const {target: {files}} = e;
     const theFile = files[0];   //index:0번에 해당하는게 파일 주소이다.
     const reader = new FileReader();  //객체인 FileReader: 브라우저의 API , 파일출력기능 (메서드를 사용하기위해 만듬)
     reader.onloadend = (finishedEvent) => {  //onloadend가 끝나는 시점에서 이벤트 객체가 들어옴,파일을 인식하는 시점과 끝나는 시점
       //console.log(finishedEvent);
       const {currentTarget:{result}} = finishedEvent; //theFile여기서 가져온 파일이 result에 이미지 url 을 넣어줌(이미지저장됨) 
       setAttachment(result);
     }
     reader.readAsDataURL(theFile);
   }
   
   const onClearAttachment = () => setAttachment(""); //이미지 삭제, setAttachment("");가 false
 
 
 
 
 
 
 
  return (
    
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input type="text" placeholder="what's on your mind" 
        value={tweet} onChange={onChange} maxLength={120} className="factoryInput__input" /> 
         
         <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
       <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
       </label>
       <input type="file" accept='image/*' onChange={onFileChange} id="attach-file" style={{opacity: 0,}}/>
       {attachment && 
       <div className="factoryForm__attachment">
         <img src={attachment} style={{backgroundImage:attachment,}}/>
         <div className="factoryForm__clear" onClick={onClearAttachment}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faXmark} />
          </div>
       </div>
        }
    </form>
  )
}

export default TweetFactory