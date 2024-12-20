import './PhotosLists.css';
import { Link } from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

const PhotosLists = ()=>{
    axios.defaults.withCredentials = true;
    const [datas, setDatas] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:8080/signin').then((res)=>{
            setLoggedIn(res.data.loggedIn);
        })
        axios.get('http://localhost:8080/getDatas').then(response=>{
            setDatas(response.data);
        }).catch(err=>{
            console.log(err);
        })
        
    },[])
    
    return(
        <>
        <h3>Click image to Buy</h3>
        {
            (loggedIn)?
            <section className="photosLists_main">
            {
                datas.map((elem)=>{
                    return(
                        <div key={elem._id} className="image_lists">
                            <Link to={`/photosLists/${elem.key}`}>
                                <img src={`./${elem.img_src}`} alt={elem.img_src}/>
                            </Link>
                        </div>
                    )
                })
            }
            </section>:
            <div className="logToStart">
                <p>Please Login first</p>
                <Link to="http://localhost:3000">Homepage</Link>
            </div>
        }
        </>
    )
}
export default PhotosLists;