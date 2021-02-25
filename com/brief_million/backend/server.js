const express = require('express');
const server = express();
server.use(express.json());
require('dotenv/config')
const db = require('./api/config/db')
const PORT = process.env.PORT || 3000

db.connect()
    .then(()=>{
        console.log("Connected to mongoDB success");
        server.listen(PORT, () => {
            console.log('run server port: ' + PORT);
        })
    })
    .catch((err)=>console.log(err))

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

module.exports = server;