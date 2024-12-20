import './Header.css';
import {Link,useLocation} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
const Header = ()=>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [showSec, setShowSec] = useState(false);
    const [user, setUser] = useState([]);
    const location = useLocation();
    useEffect(()=>{
        setShowSec(false);
        axios.get('http://localhost:8080/signin',{withCredentials:true}).then((res)=>{
            setLoggedIn(res.data.loggedIn);
            if(res.data.loggedIn && res.data.user){
                setUser(res.data.user[0]);
            }else{
                setUser(null);
            }
        }).catch((err)=>{
            setLoggedIn(false);
            setUser(null);
        })
    },[location])

    const handleLogout = async()=>{
        try {
            await axios.post('http://localhost:8080/signout', {}, {
              withCredentials: true,
            });
            window.location.reload();
          }catch (error) {
            console.error('Error logging out:', error);
          }
    }
    
    return(
        <>
        <section className="header_main">
            <div className="header_left">
                <div className="header_logo">
                    <img src="/image/sellingWeb.png" alt="website logo"/>
                </div>
                <div className="web_name">
                    <h1>NatureLens</h1>
                </div>
            </div>
            {
                (loggedIn) ? 
                <div className="name_profile" onClick={()=>{setShowSec(!showSec)}}>
                    <p>{user.fullname}</p>
                    <img src="/image/profile.png" alt="profile logo"></img>
                </div>
                :
                <div className="profile" onClick={()=>{setShowSec(!showSec)}}>
                    <img src="/image/profile.png" alt="profile logo"></img>
                </div>
            }
        </section>
        {
            (loggedIn) ? 
            <section className={(showSec)?"showSec":"hideSec"}>
                <div><button onClick={handleLogout}>Signout</button></div>
            </section> : 
            <section className={(showSec)?"showSec":"hideSec"}>
                <div><Link to="/signup">Signup</Link></div>
                <div><Link to="/signin">Signin</Link></div>
            </section>
        }
        
        </>
    )
}
export default Header;