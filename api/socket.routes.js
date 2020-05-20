module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('shuffeling', cards => {
            // io.emit('shuffled cards', cards) 
            // emits only to sockets in the same room
            io.to(socket.roomTopic).emit('shuffled cards', cards)
        })

        socket.on('card move', ({ card, locX, locY, zIndex }) => {
            // console.log(locX, '', locY);
            console.log('BACKEND Z-IDX', zIndex)
            socket.to(socket.roomTopic).emit('card moved', { card, locX, locY, zIndex })
        })

        socket.on('entering-room', roomId => {
            if (socket.roomTopic) {
                socket.leave(socket.roomTopic)
            }
            socket.join(roomId)
            socket.roomTopic = roomId;

        })
        // socket.on('writingUser', ({ from, topic }) => {
        //     console.log('avivush');
        //     socket.broadcast.emit('typing', { from, topic })
        // })
    })
}