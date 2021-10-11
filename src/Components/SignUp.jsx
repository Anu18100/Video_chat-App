import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from 'axios';


const SignUp=(props)=>{
    let history = useHistory();
    const [msg , setMsg] = useState('');
    const [email , setEmail] = useState('');
    const [mob , setMob] = useState('');
    const [name , setName] = useState('');
    const [pass , setPass] = useState('');
    const [cpass , setCPass] = useState('');
        function Sign_user(){
            if(email==='' || pass==='' || name==='' || mob==='')
            {
                setMsg('All The data are Required');
            }
            else{
                if(pass!==cpass)
                {
                    setMsg('Password and Confirm Password must be same.');
                }
                else
                {
                    Axios.post('http://localhost:3001/api/checkemail',{email:email}).then((res)=>{
                        if(res.data.length!==0){
                            setMsg('This mail is already in use!!!');
                        }
                        else{
                            Axios.post('http://localhost:3001/api/signup',{email:email,mob:mob,name:name,pass:pass}).then((result)=>{
                                console.log(result.data)
                                if(result.data === 'done'){
                                    alert('Signed Up Succesffully')
                                    return history.push('/login');
                                }
                            });
                        }
                        
                    })
                }
            };
        };

                    return (
                    <>
                    { props.logged_in==='Yes' &&( this.props.history.push('/'))}
                    {msg!=='' && (<div class="alert alert-danger" role="alert">{msg}</div>)}

                    <div className='loginf'>
                    <span className='danger' id='signform'></span>
                        <legend className='my'>Sign Up Here!</legend>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" onChange={(e)=>setName(e.target.value)}/>
                            <label for="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingPassword" onChange={(e)=>setMob(e.target.value)}/>
                            <label for="floatingPassword">Mobile Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" onChange={(e)=>setEmail(e.target.value)}/>
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" onChange={(e)=>setPass(e.target.value)}/>
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" name='cnfpass' onChange={(e)=>setCPass(e.target.value)}/>
                            <label for="floatingPassword">Confirm Password</label>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={()=>{Sign_user()}}>Submit</button>
                        </div>
                    </>
                );
};

export default SignUp;