import React from 'react';
import Axios from 'axios';
import { useState } from 'react/cjs/react.development';

const Account =(props)=>{

    function updateAcc(email,name,mob,props){
        if(email===props.user.email){
            Axios.post('http://localhost:3001/api/update',{email:email,mob:mob,name:name,id:props.user.id}).then((result)=>{
                console.log(result.data)
                if(result.data === 'done'){
                 props.history.push('/');
                }
            });
        }
        else{
            Axios.post('http://localhost:3001/api/checkemail',{email:email}).then((res)=>{
                        if(res.data.length!==0){
                            document.getElementById('signform').innerHTML= "This mail is already in use!!!";
                        }
                        else{
                            Axios.post('http://localhost:3001/api/update',{email:email,mob:mob,name:name,id:props.user.id}).then((result)=>{
                                console.log(result.data)
                                if(result.data === 'done'){
                                 props.history.push('/');
                                }
                            });
                        }
                        
                    })
        } 
    }


    const [name,setName] = useState(props.user.uname);
    const [email,setEmail] = useState(props.user.email);
    const [mob,setMob] = useState(props.user.mobile);

    return(

        <>
                    { props.logged_in==='NO' &&( this.props.history.push('/'))}
                    <div className='loginf'>
                    <span className='danger' id='signform'></span>
                        <legend className='my'>Account Info</legend>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder={props.user.uname} onChange={(e)=>{setName(e.target.value)}}/>
                            <label for="floatingInput">{props.user.uname}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingPassword" placeholder={props.user.mobile} onChange={(e)=>{setMob(e.target.value)}}/>
                            <label for="floatingPassword">{props.user.mobile}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder={props.user.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <label for="floatingInput">{props.user.email}</label>
                        </div>


                        <button type="button" className="btn btn-primary" onClick={()=>{updateAcc(email,name,mob,props);props.updateAcc(name,mob,email)}}>Update</button>
                        </div>
                    </>
    )
}


export default Account;