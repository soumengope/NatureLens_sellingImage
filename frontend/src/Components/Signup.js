import './Sign.css';
import { useState } from "react";
import axios from 'axios'
const Signup = ()=>{
    const [data, setData] = useState({
        'fullname':'',
        'email' : '',
        'password' : '',
        'cpassword':''
    })
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(false);
    
    const inpChange = (e)=>{
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    }
    const formSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/signup",
            {inpValues:{data}})
            .then((res)=>{
                console.log(res.data);
                if(res.data.status === 200){
                    setStatus(true);
                }else{
                    setStatus(false);
                }
                setMessage(res.data.message)
                if(res.data.status === 200){
                    setTimeout(()=>{
                        window.location.href = 'http://localhost:3000/signin'
                    },2000)
                }
            })
    }
    
    return(
        <>
        <h3>Signup Now</h3>

        <p className={(status)? "greenMsg" : "redMsg"}>{message}</p>
        <form onSubmit={formSubmit} className="form_main"> 
            <div className="sign_control">
                <label className="label_name">Fullname</label>
                <div><input name="fullname" value={data.fullname} onChange={inpChange}></input></div>
            </div>
            <div className="sign_control">
                <label className="label_name">Email</label>
                <div><input name="email" value={data.email} onChange={inpChange}></input></div>
            </div>
            <div className="sign_control">
                <label className="label_name">Password</label>
                <div><input name="password" value={data.password} onChange={inpChange}></input></div>
            </div>
            <div className="sign_control">
                <label className="label_name">Confirm password</label>
                <div><input name="cpassword" value={data.cpassword} onChange={inpChange}></input></div>
            </div>
            <div className="sign_control"><button type="submit">Signup</button></div>
        </form>
        </>
    )
}
export default Signup;