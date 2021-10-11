import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import home_img from './back.jpg';


class Home extends Component{
    render(){
            return ( 
                <>
                    <div class="mb-1" id=''>
                        <div class="col-md-11 mx-5">
                            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div class="col p-4 d-flex flex-column position-static">
                                    <div class='pcon'>
                                    <h2 class="card-text mb-auto" id='fcenter'>Call Your Friends and Talk <br/>&nbsp;Face to Face With them</h2>
                                    </div>
                                    <div class='bcon'>
                                        <button class='btn btn-primary' id='homebtn' onClick={()=>{this.props.history.push('/video_room')}}>Start Video Chat</button>
                                    </div>
                                </div>
                                <div class="col-auto d-none d-lg-block">
                                    <img width='300px' src={home_img} alt='Not Found'/>
                                </div>
                            </div>
                        </div>
                    </div>



                    
                </>);
    }
};


export default Home;