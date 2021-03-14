const express = require('express');
const server = express();
require('dotenv/config')
const db = require('./api/config/db')
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const http = require('http').createServer(server);
const io = require('socket.io')(http);

// server.use((req, res, next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization')
//     next();
// })

db.connect()
    .then(()=>{
        console.log("Connected to mongoDB success");
        http.listen(PORT, () => {
            console.log('run server port: ' + PORT);
        })
    })
    .catch((err)=>console.log(err))
    
server.use(express.json());
server.use(cors());

io.on('connection', socket => {
    console.log('new Particpant');

    socket.on('group', (data)=>{
        console.log('participant has created new group', data);
        io.emit('grpMemeber')
    })

    socket.on('joinToGrooup', (data)=>{
        console.log('participant has join in group', data);
        io.emit('grpMemeber')
    })

    socket.on('quiz', () => { 
        io.emit('start game');
    })

    const adminRouter = require('./api/routes/admin.router');
    server.use('/admin', adminRouter);

    const participantRouter = require('./api/routes/participant.router');
    server.use('/participant', participantRouter);

    const questiontRouter = require('./api/routes/question.router');
    server.use('/question', questiontRouter);

    const GRP_memberRouter = require('./api/routes/GRP_member.router');
    server.use('/groupMember', GRP_memberRouter);

    const qstTokenRouter = require('./api/routes/qstToken.router');
    server.use('/question_token', qstTokenRouter);

    const roundRouter = require('./api/routes/round.router');
    server.use('/round', roundRouter);

    const rScoreRouter = require('./api/routes/round_score_statistic.router');
    server.use('/round_score', rScoreRouter);

    const finalWinRouter = require('./api/routes/final_winner.router');
    server.use('/final_winner', finalWinRouter);

    const giftRouter = require('./api/routes/gifts.router');
    server.use('/gifts', giftRouter);

    socket.emit('message', ' welcome to app')

    socket.on('disconnect', ()=>{
        console.log('client had left');
    })
})

module.exports = server;