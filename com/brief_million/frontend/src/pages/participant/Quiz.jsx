import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:5000');
const socket = io();

class Quiz extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            questions:[],
            currentQuestion:{},
            currentQuestionIndex:0,
            nextQuestion:{},
            score:0
        }
    }
     
    componentDidMount(){
        const{questions, currentQuestion, nextQuestion} = this.state; 
        this.displayQuestions(questions, currentQuestion, nextQuestion)
        
    }

    displayQuestions = (questions , currentQuestion, nextQuestion)=>{
        let {currentQuestionIndex, score} = this.state;
        axios.get('/question',{
            headers: { "Authorization": localStorage.getItem('Particip_token') },
        })
            .then(res => {
                console.log(res.data);
            this.setState({
                questions: res.data,
            })
            if ((this.state.questions.length>1)) {
            
                questions = this.state.questions;
                currentQuestion = questions[currentQuestionIndex];
                nextQuestion = questions[currentQuestionIndex + 1];
                // console.log(score);
                
                this.setState({
                    currentQuestion,
                    nextQuestion,
                    score,
                })
            }
        })   
    } 

    handleChoice(pAnswer, questionId, points){
       
        if (pAnswer === this.state.currentQuestion.answer) {

            let {score, currentQuestion} = this.state
            score = this.state.score + currentQuestion.points
            this.setState({score})
            // console.log(score);

            axios.post('/question_token/post',
                {
                    "id_question" : questionId,
                    "participant_answer" : pAnswer,
                    "id_participant" : localStorage.getItem('idAuthP')
                }
            )
            .then(resQsToken =>{
                console.log('question token',resQsToken.data);   
                axios.post('/round/post',
                {
                    id_group_member:localStorage.getItem('idGroup'),
                    id_question: questionId,
                    id_question_token:resQsToken.data._id,
                }).then(round=>{
                    console.log('round',round.data);
                    
                    axios.post('/round_score/post',
                    {
                        id_round:round.data._id,
                        score: score,
                    }).then(roundScore=>{
                        console.log('score',roundScore.data);
                    })                     
                })    
            })
        }
        this.setState(pState => ({
            currentQuestionIndex: pState.currentQuestionIndex + 1,
            currentQuestion: pState.currentQuestion,
            score: pState.score 
        }), ()=>{
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion)
        })
        // console.log(pAnswer, questionId);
        // console.log({answer, falseChoice, questionId});
        // console.log(localStorage.getItem('idAuthP'));
        // console.log(localStorage.getItem('idGroup'));
        socket.emit('rounded')
    }

    final_win(maxIndexQst, finalScore){
        if (maxIndexQst == 1) {
            console.log('final winner');
            // await axios.get('/gifts').then(giftImg=>{
            //     console.log(giftImg.data);
                axios.post('/final_winner/post',{
                    id_round:'605167d1867591366c7a2fc5',
                    final_score:finalScore,
                    id_participant:'603643edd82d6a54a41bf795',
                    id_gift:'6051d1fa390dcf32b0f7a16f',
                }).then(winner=>{
                    console.log('winner ',winner.data);
                })
            // })
        }
    }

    render() { 
        const {questions, currentQuestion, currentQuestionIndex, score} = this.state;
         console.log(score);
         this.final_win(currentQuestionIndex, score)
        return (
            <center className="container mt-4">
                {currentQuestionIndex + 1 +'/'+ questions.length}
                <span className="float-right">Score: {score}</span>
                <div key={currentQuestion._id} className="mt-5">
                    <span className="card bg-primary text-white p-3 my-3">{currentQuestion.question}</span>
                    <div className="row justify-content-md-center">
                        <span onClick={() => this.handleChoice((currentQuestion.false_choice1),currentQuestion._id, currentQuestion.points)} type="button" className="col-sm-4 bg-dark text-white rounded p-3 m-3">{currentQuestion.false_choice1}</span>
                        <span onClick={() => this.handleChoice((currentQuestion.answer),currentQuestion._id, currentQuestion.points)} type="button" className="col-sm-4 bg-dark text-white rounded p-3 m-3">{currentQuestion.answer}</span>
                        <span onClick={() => this.handleChoice((currentQuestion.false_choice2),currentQuestion._id, currentQuestion.points)} type="button" className="col-sm-4 bg-dark text-white rounded p-3 m-3">{currentQuestion.false_choice2}</span>
                        <span onClick={() => this.handleChoice((currentQuestion.false_choice3),currentQuestion._id, currentQuestion.points)} type="button" className="col-sm-4 bg-dark text-white rounded p-3 m-3">{currentQuestion.false_choice3}</span>
                    </div>
                </div>
            </center>
        );
    }
}
 
export {Quiz};