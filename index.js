const express = require('express');
const app = express();
const server = require('http').createServer(app)
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require('cors');





const io = require('socket.io')(server,{
    cors: {
        origin: "*",
        method: ["GET" , "POST"]
    }
});






app.use(cors());


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'993095',
    database:'video_chat'
});



app.post('/api/checkemail',(req,res)=>{
    const email = req.body.email;
    db.query('select * from login where email=?',[email],(err,result)=>{
        res.send(result);
    })
});




app.post('/api/checkemailpass',(req,res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    var user={};
    db.query('select * from login where email=? and pass = ?;',[email,pass],(err,result)=>{
        res.send(result);
    })

});


app.post('/api/signup',(req,res)=>{
    const name = req.body.name;
    const mob = req.body.mob;
    const email = req.body.email;
    const pass = req.body.pass;

    const dis='insert into login (uname,mobile,email,pass) value(?,?,?,?);';
    db.query(dis,[name,mob,email,pass],(err,result)=>{
            console.log(result);
            res.send('done')
            });
});



app.post('/api/update',(req,res)=>{
    const name = req.body.name;
    const mob = req.body.mob;
    const email = req.body.email;
    const id = req.body.id

    const dis='update login set uname=? , mobile=? , email =? where id=?;';
    db.query(dis,[name,mob,email,id],(err,result)=>{
            console.log(err);
            res.send('done')
            });
});



app.post('/api/isuser',(req,res)=>{
    const email = req.body.email;
    db.query('select * from login where email=?',[email],(err,result)=>{
        res.send(result);
    })
});

app.post('/api/isonline',(req,res)=>{
    const email = req.body.email;
    db.query('select * from is_online where email=?',[email],(err,result)=>{
        res.send(result);
    })
});


io.on('connection',(socket)=>{
    socket.on('conct',({email})=>{
        console.log(email);
        const ife = 'select * from is_online where email=?';
        db.query(ife,[email],(err,result)=>{
            if( result.length == 0){
                const dis='insert into is_online (email,socket_id) value(?,?);';
                db.query(dis,[email,socket.id],(err,result)=>{
                        console.log(err);
                        });
                    }
                else{
                    const dis='update is_online set socket_id=? where email=?;';
                    db.query(dis,[socket.id,email],(err,result)=>{
                        console.log(err);
                        });
                }
            });
    });
    socket.emit('me',socket.id);
    


    socket.on('disconnect',()=>{
        const dis='delete from is_online where socket_id=?';
        db.query(dis,[socket.id],(err,result)=>{
                console.log(err);
                });
    });

    socket.on('calluser',({usertocall,name,signaldata,from})=>{
        io.to(usertocall).emit('calluser',{signal : signaldata , from , name});
    });

    socket.on('answercall',(data)=>{
        io.to(data.to).emit('callaccepted',{signal:data.signal,name:data.name});
    })

    socket.on('leavecall',(data)=>{
        io.to(data.to).emit('callended');
    })
});




server.listen(5000,()=>{
    console.log('Server running');
})






app.listen(3001,()=>{
    console.log('app running');
})

