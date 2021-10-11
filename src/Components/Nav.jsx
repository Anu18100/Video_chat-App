import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
            return (
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container-fluid">
                        <Link class="navbar-brand" to={'/'}>ASHK CHAT</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                { props.logged_in==='NO' &&(
                                <>
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to={'/'}>Home</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={'/login'}>Login</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={'/signUp'}>Sign Up</Link>
                                </li>
                                </>)}
                                {
                                    props.logged_in==='Yes' &&(  
                                <>
                                <li class="nav-item mx-5">
                                <Link class="nav-link active" to="/">Welcome {props.user.uname}</Link>
                                </li>

                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to={'/'}>Home</Link>
                                </li>
                                <li class="nav-item">
                                <Link class="nav-link" to="/myAccount">My Account</Link>
                                </li>
                                <li class="nav-item">
                                <Link class="nav-link" to="/logout">Logout</Link>
                                </li>
                                </>)}
                               
                            </ul>

                        </div>
                    </div>
                </nav>


                 );
};


export default Nav;