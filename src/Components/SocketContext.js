import React , { Component,createRef} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
import callIcon from './call.png';
import hangUp from './hangupo.jpg';
import axios from 'axios';


class ContextProvider extends Component{
    constructor(props){
        super(props)
        this.state={
            msg : '',
            calling:false,
            caller:'',
            stream:undefined,
            idToCall:'',
            me:'',
            name:this.props.user.uname || 'Name',
            callaccepted:false,
            callended:false,
            call:'',
        }

        this.socket = io('http://localhost:5000/');
        this.myvideo = createRef();
        this.uservideo = createRef();
        this.connectionRef = createRef();


        this.isuser = this.isuser.bind(this);
        this.answercall = this.answercall.bind(this);
        this.calluser = this.calluser.bind(this);
        this.leavecall = this.leavecall.bind(this);
    }


    
    componentDidMount(){
        if(this.props.history.location.pathname==='/video_room'){
        navigator.mediaDevices.getUserMedia({video: true,audio:true}).then((currentStream) => {
            this.setState({stream:currentStream});
            this.myvideo.current.srcObject = currentStream;
        });
        this.socket.emit('conct',{email:this.props.user.email});
        this.socket.on('me',(id)=>this.setState({me:id}));


        this.socket.on('calluser',({from , name:callerName , signal})=>{
            this.setState({call:{isCallRecived:true, from , name:callerName , signal}});
        });


      }}





    isuser(id){
        axios.post('http://localhost:3001/api/isuser',{email:id}).then((res)=>{
            if(res.data.length ===0 ){
                this.setState({msg:'User Does Not Using Our Services.'});
            }
            else{
                axios.post('http://localhost:3001/api/isonline',{email:id}).then((res)=>{
                    if(res.data.length ===0 ){
                    this.setState({msg:'User is Offline at The Movement'});
                    }
                    else{
                        this.calluser(id);
                    }
                })
            }
        })
    }


    answercall(){
        this.setState({callaccepted:true});

        const peer = new Peer({initiator:false,trickle:false,stream:this.state.stream});

        peer.on('signal',(data)=>{
            this.socket.emit('answercall',{signal:data, to:this.state.call.from , name:this.state.name})
        });

        peer.on('stream',(currentStream)=>{
            this.uservideo.current.srcObject=currentStream;
        })

        peer.signal(this.state.call.signal);


        this.connectionRef.current = peer;

    };


    calluser(id){
        this.setState({calling:true,msg:""});
        const peer = new Peer({initiator:true,trickle:false,stream:this.state.stream});

        peer.on('signal',(data)=>{
            this.socket.emit('calluser',{usertocall:id,  name:this.state.name, signaldata:data , from:this.state.me,})
        });

        peer.on('stream',(currentStream)=>{
            this.uservideo.current.srcObject=currentStream;
        });

        this.socket.on('callaccepted',(data)=>{
            this.setState({callaccepted:true});
            this.setState({caller:data.name});
            peer.signal(data.signal);
        });


        this.connectionRef.current = peer;
    };



    leavecall(){
        this.setState({callended:true});
        this.connectionRef.current.destroy();
        this.props.history.push('/')
    };


    render(){

    return(
        <>
            {this.props.logged_in === 'NO' && (<>{this.props.history.push('/') && window.location.reload}</>)}
            {this.state.msg!=='' && (<div class="alert alert-danger" role="alert">{this.state.msg}</div>)}
            <div class='vc'>
                {
                    this.state.stream && (
                        <>
                            <div class='myvideo'>
                                <div class='callname'><span class="navbar-brand mb-0 h1" >{this.state.name || 'Name'}</span></div><br />
                                <video muted ref={this.myvideo} autoPlay></video>
                            </div>
                        </>
                    )
                }
                {
                    this.state.callaccepted && !this.state.callended && (
                        <div class='urvideo'>
                            <div class='callname'><span class="navbar-brand mb-0 h1" >{this.state.call.name || this.state.caller}</span></div><br />
                            <video ref={this.uservideo} autoPlay></video>
                        </div>
                    )
                }
            </div>



            <div class="mt-1" id=''>
                <div class="col-md-11 mx-5">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col p-4 d-flex flex-column position-static">
                            <div class='con'>
                            <span class='navbar-brand mb-0 h1'>Call Info</span><br/>
                            
                                <input typr='text' label='Id To call' placeholder='Enter Mail To Call' value={this.state.idToCall} onChange={(e) => this.setState({ idToCall: e.target.value })} />
                                {
                                    this.state.callaccepted && !this.state.callended ? (
                                        <img width='43px' src={hangUp} alt='Not Found' onClick={()=>this.leavecall()} />
                                    ) : (
                                        <img class='callicon' width='43px' alt='Not Found' src={callIcon} onClick={() => { this.isuser(this.state.idToCall) }} />
                                    )
                                }
                            </div>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                            <div class="call_info_con">
                                <div class='call_noti'>
                                    {
                                        this.state.call && !this.state.callaccepted && (
                                            <div class="alert alert-primary" role="alert">
                                                <span class='navbar-brand mb-0 h1'>{this.state.call.name} is calling: </span>
                                                <img class='callicon' width='43px' alt='Not Found' src={callIcon} onClick={this.answercall} />

                                            </div>
                                        )}

                                    {
                                        !this.state.callaccepted && this.state.calling && (
                                            <div class="alert alert-primary" role="alert">
                                                <span class='navbar-brand mb-0 h1'>calling to {this.state.idToCall}: </span>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}};

export { ContextProvider};