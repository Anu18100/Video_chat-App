import React, { Component } from "react";
import Nav from './Components/Nav'
import { Switch , BrowserRouter as Router,Route } from 'react-router-dom';
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { Error } from "./Components/error";
import History from "./Components/History";
import Logout from "./Components/Logout";
import { ContextProvider } from "./Components/SocketContext";
import Account from "./Components/Account";

class App extends Component
{
    constructor(){
        super();

        this.state = {
            logged_in : 'NO',
            user:{}
        };


        this.islogin = this.islogin.bind(this);
        this.islogout = this.islogout.bind(this);
        this.updateAcc = this.updateAcc.bind(this);
    }

    

    
    islogin(data){
        this.setState({
            logged_in :'Yes',
            user : data[0]
        });
    }

    updateAcc(name,mob,email){
        this.setState({user:{
            uname:name,
            mobile:mob,
            email:email
        }});
    };

    islogout(){
        this.setState({
            logged_in:'NO',
        });
        delete this.state.user;
    }
    
    render(){
    return(
    <>

        <Router history={History}>
        <Nav user={this.state.user} logged_in={this.state.logged_in}/>
        <Switch>
                <Route path='/' exact render={props=>(
                    <Home {... props} user={this.state.user} logged_in={this.state.logged_in}/>)}/>
                <Route path='/login' exact render={props=>(
                    <Login {... props} islogin={this.islogin} logged_in={this.state.logged_in}/>)}/>
                <Route path='/signUp' exact render={props=>(
                    <SignUp {... props} logged_in={this.state.logged_in}/>)}/>
                <Route path='/logout' exact render={props=>(
                    <Logout {... props} islogout={this.islogout}/>)}/>
                
                <Route path='/video_room' render={props=>(
                    <ContextProvider {... props} user={this.state.user} logged_in={this.state.logged_in}/>)}/>
                <Route path='/myAccount' render={props=>(
                    <Account {... props} user={this.state.user} updateAcc={this.updateAcc}  logged_in={this.state.logged_in}/>)}/>
                
                <Route component={Error}></Route>
        </Switch>
        </Router>
    </>
        );
    };
    
};

export default App;