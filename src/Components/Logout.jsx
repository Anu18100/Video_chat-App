import React from "react";


const Logout=(props)=>{
    props.islogout();
    props.history.push('/');
    return(
        <></>
    );
}

export default Logout;