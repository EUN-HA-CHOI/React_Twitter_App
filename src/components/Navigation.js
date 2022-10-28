import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "styles/navigation.scss";

function Navigation({userObj}) {
  return (
    <nav>
      <ul style={{display: "flex", justifyContent: "center", marginTop:50}}>
        <li>
          <Link to={'/'}  style={{marginRight:10}}>
          <FontAwesomeIcon icon="fa-brands fa-twitter" color={"#04AAFF"} size="2x"/>
          </Link>
        </li>

         <li>
        <Link to={'/profile'} style={{display:"flex", flexDirection: "column", alignItems:"center",
           marginLeft:10, fontSize:12,}}>
            <span style={{ marginTop: 10 }}>
              {userObj.displayName ? `${userObj.displayName}의 Profile`: "Profile"}
            </span>
          {userObj.photoURL && (
            <img src={userObj.photoURL} width="50" height="50"/>
          )}
          </Link> 
        </li>
    
       
      </ul>
    </nav>
  )
}

export default Navigation