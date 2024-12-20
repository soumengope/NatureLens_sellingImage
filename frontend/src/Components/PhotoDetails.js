import './PhotoDetails.css';
import { useParams } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const PhotoDetails= ()=>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [datas, setDatas] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState(0);
    useEffect(()=>{
        axios.get('http://localhost:8080/getDatas').then(response=>{
            setDatas(response.data);
        }).catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:8080/signin',{withCredentials:true}).then((res)=>{
            setLoggedIn(res.data.loggedIn);
        })
    },[])

    const handlePayment = async ()=>{
        if (!dataMatch || !dataMatch.price) {
            console.log('Price not available');
            return;
        }
        try{
            const { data: order } = await axios.post('http://localhost:8080/makeOrder', {
                amount: dataMatch.price,
            });

            const options = {
                key: 'rzp_test_NZdTxJCyREt7iF',
                amount: order.amount,
                currency: order.currency,
                name: 'Unknown',
                description: 'Product Payment',
                order_id: order.id,
                handler: function (response) {
                    console.log(response);
                    setPaymentStatus(1);
                },
            }
            const razor = new window.Razorpay(options);
            razor.open();
        }catch(err){
            setPaymentStatus(0);
            console.log(err); 
        }
    }
    
    const {id} = useParams();
    const dataMatch = datas.find(elem => String(elem.key) === id);

    return(
        (loggedIn)?
        (
        <>
        {
            (paymentStatus === 1)?<p className="greenColor">Payment Successful</p>:''
        }
        {(dataMatch)?
            <div className="main_imgDetails">
                <div className="imgDetails_img"><img src={`../${dataMatch.img_src}`} alt={dataMatch.img_src}/></div>
                <div className="imgDetails_desc">
                    <p className="desc">{dataMatch.desc}</p>
                    <div className="imgDetails_price">
                        <input type="radio" value="default" defaultChecked/>
                        <p>RS {dataMatch.price} for this Image</p>
                    </div>
                    {
                        (paymentStatus === 1) ? 
                        <a className="download_btn" href={`./${dataMatch.org_img}`} download={dataMatch.img_src}>
                        Download Image</a> :
                        <button className="buy_button" onClick={handlePayment}>Buy Now</button>
                    }

                    <div className="img_details">
                        <p><span>Photo clicked by :</span> Smartphone</p>
                        <p><span>Mode :</span> Protrait</p>
                        <p><span>Format :</span> JPEG</p>
                        <p><span>Resolution :</span> 2688x1512 pixels</p>
                        <p><span>Aperture :</span> f/2.2</p>
                        <p><span>Camera Brand :</span> Xiaomi</p>
                    </div>
                </div>
            </div>
            :'Loading...'
        }
        </>
        ):(
            <>
            <div className="logToStart">
                <p>Please Login first</p>
                <Link to="http://localhost:3000">Homepage</Link>
            </div>
            </>
        )
    )
}
export default PhotoDetails;