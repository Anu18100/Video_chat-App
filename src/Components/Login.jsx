import React, { Component } from "react";
// import { useHistory } from "react-router-dom";
import Axios from "axios";
// import Home from "./Home";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            msg:'',
            email:'',
            pass:'',
            mess:'Hello'
        }

        this.login_user=this.login_user.bind(this);
    }


    login_user(e){
        const  email  = this.state.email;
        const pass = this.state.pass;
        console.log(email);
        console.log(pass);
        if(email==='' || pass===''){
            this.setState({ msg:"'All the data is requierd'"});
        }
        else{
            Axios.post('http://localhost:3001/api/checkemailpass',{email:email,pass:pass}).then((res)=>{
                        if(res.data.length===0){
                            this.setState({ msg:"Enter Email and password Correctly!!!"});
                        }
                        else{
                            this.props.islogin(res.data);
                            alert('Logged In Successfully')
                            this.props.history.push('/');
                        }
                });
            }
        }
    
    
    render(){
        return (

                <>
                { this.props.logged_in==='Yes' &&( this.props.history.push('/'))}
                {this.state.msg!=='' && (<div class="alert alert-danger" role="alert">{this.state.msg}</div>)}
        
                <div className='loginf'>

                <span id='loginform'></span>

                    <legend className='my'>Login Here!</legend>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" name='email' onChange={(e)=>this.setState({email:e.target.value})}/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" name='pass' onChange={(e)=>this.setState({pass:e.target.value})}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={(e)=>this.login_user(e)}>Login</button>
                    
                </div>
                </>
                );
};
};

export default Login;