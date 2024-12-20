import './Sign.css';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
const Signin = ()=>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [inpData, setInpData] = useState({
        email : '',
        password : ''
    })
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);

    const inpChange = (e)=>{
        const {name ,value} = e.target;
        setInpData({
            ...inpData,
            [name]:value
        })
    }

    const formSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/signin', 
            {email:inpData.email, password:inpData.password},
            { withCredentials: true }).then((res)=>{
            setMessage(res.data.message)
            if(res.data.status === 200){
                setStatus(true);
                setTimeout(()=>{
                    window.location.href = 'http://localhost:3000/'
                },1000)
            }
        })
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/signin',{withCredentials:true}).then((res)=>{
            setLoggedIn(res.data.loggedIn);
        })
    },[])

    return(
        <>
        <h3>Sign In Page</h3>

        <p className={(status)? "greenMsg" : "redMsg"}>{message}</p>
        
        {
            (loggedIn)?
            <div className="logToStart">
                <p>You have loggedIn already</p>
                <Link to="http://localhost:3000/photosLists">PhotosLists</Link>
            </div>:
            <form onSubmit={formSubmit} className="form_main">
                <div className="sign_control">
                    <label className="label_name">Email</label>
                    <div><input type='text' name='email' onChange={inpChange}></input></div>
                </div>
                <div className="sign_control">
                    <label className="label_name">Password</label>
                    <div><input type='text' name='password' onChange={inpChange}></input></div>
                </div>
                <div className="sign_control"><button type="submit">Submit</button></div>
            </form>
        }

        </>
    )
}
export default Signin;