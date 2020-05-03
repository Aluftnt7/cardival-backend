const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
// const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const connectSockets = require('./api/socket.routes')


app.use(cookieParser())
app.use(bodyParser.json());
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:4200', 'http://localhost:4200', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
});
// routes
connectSockets(io)





