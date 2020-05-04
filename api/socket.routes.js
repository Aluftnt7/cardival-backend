module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('shuffeling', cards => {
            
            io.emit('shuffled cards', cards)
            // emits only to sockets in the same room
            // io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat topic', topic => {
            console.log(topic);

            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('writingUser', ({ from, topic }) => {
            console.log('avivush');
            socket.broadcast.emit('typing', { from, topic })
        })
    })
}