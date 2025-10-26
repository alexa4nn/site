var express = require('express');

var app = express();
// var server = app.listen(3000);
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);
console.log("socket server is running")

const users = [];
var user = -1;

let receiver;

io.sockets.on('connection', newConnection)



function newConnection(socket) {

    user++;
    if (users.length === 0) {
        user = 0;


    }

    users.push({
        userID: socket.id,
        user: user
    });
    console.log('new connection: ' + socket.id);
    console.log('there are ' + users.length + ' lovers in this moment');

    socket.emit("users", users);
    console.log(users);

    // ...

    socket.on('mouse', mouseMsg)

    function mouseMsg(data) {

        socket.broadcast.emit('mouse', data)
        //include all sockets including yourself
        //io.sockets.emit('mouse',data);
        //console.log(data);

    }

    socket.on('moment', momentMsg)

    function momentMsg(thisMoment){
        socket.broadcast.emit('moment', thisMoment);
    }

    receiver = users[0].userID;
    console.log('reciever id: '+ receiver)

    socket.on('print', function(){
        // if((socket.id == receiver)){
            socket.to(receiver).emit('print', () => console.log('user ' + socket.id + ' is printing'));
        // }
    })
   

    socket.on('disconnect', disconnect)

    function disconnect() {
        const signedOff = users.findIndex(object => {
            return object.userID === socket.id;
        })
        console.log('Client ' + signedOff + ' disconnected');
        users.splice(signedOff, 1);
        console.log('there are ' + users.length + ' users in this moment');


        console.log(users);


    }

}