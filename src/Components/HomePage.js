import React, { useState,useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import Footer from './Footer';
// import Section from './Section'
import '../App.css';
function HomePage(props) {
    const history = useHistory();
    const location = useLocation();
    console.log("location at homePage::::",location.state);
    const [errorMessages, setErrorMessages] = useState({});
    const [password,setPassword] = useState('');
    const [userName,setUserName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const errors = {
        uname: "invalid username",
        pass: "invalid password"
      };

const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    const userData = fetch("http://localhost:9002/users")
    .then(response => {
        return response.json();
    })
    .then(data =>  {
        // console.log(JSON.stringify(data));
        let newArr = data.map((item) => {
        
          if (userData) {
            if (item.password !== password) {
              // Invalid password
              setErrorMessages({ name: "pass", message: errors.pass });
            }else if(item.name !== userName){
              setErrorMessages({ name: "uname", message: errors.uname });
            } else {
              setIsSubmitted(true);
            }
          } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
          }
       
       });
    }
    )
    .catch(error => {
        alert('There was a problem with the request.');
    });
  };
  useEffect(() => {
    console.log("isSubmitted:",isSubmitted);
    if (isSubmitted) {
      history.push("/UserHome",
        {
        state: { userName: userName, password: password }
    });
    }
  }, [isSubmitted]);

const renderErrorMessage = (name) =>{
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
);
  }
console.log("isSubmitted:",errorMessages);
return (
    <nav>
    <div className="container">
    <nav className="nav_checkbox">
                <a href="#" className="logo">RIDESHARE</a>
                <input type="checkbox" id="tab-nav" className="tab-nav"/>
                <label for="tab-nav" className="label">
                    <div class="burger"></div>
                    <div class="burger"></div>
                    <div class="burger"></div>
                </label>
                <ul className="content_nav">
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">BLOG</a></li>
                    <li><a href="#">SERVICE</a></li>
                  
                </ul>
            </nav>
     </div>
     <div className='content_section'>
     {/* <div className = "errMsg">
          {location.state.registeredFlag === 'registerFlag' ? <div>{location.state.userName} registered successfully,please Login.</div> : ""}
      </div> */}
     <div>
     {/* <form onSubmit={handleSubmit}> */}
       <div className="input-container">
         <label>Username </label>
         <input type="text" name="uname" value={userName} onChange={(e) => setUserName(e.target.value)} required />
         {renderErrorMessage("uname")}
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
         {renderErrorMessage("pass")}
       </div>
       <div className="button-container">
       <button id= "login" type="submit" onClick={(e)=>{handleSubmit(e)}}>Login</button>
       <button id= "register" type="submit"  onClick={() => history.push({
                            pathname: '/Register'
                        }
                        )}>Register</button>                
     </div>
     <div className = "errMsg">
      {!isSubmitted ? <div>{errorMessages.message}</div> : ""}
  
  </div>
     {/* </form> */}
   </div>
     </div>
     <div className='contentfooter'><Footer/></div>

     
    
  </nav>
  )
}

export default HomePage