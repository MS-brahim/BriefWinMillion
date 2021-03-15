import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:5000');
const socket = io();
// socket.on('server',() =>{
//     console.log('$ server');
// });

class Quiz extends Component {  
    state = {
        questions:[],
        // currentQuestion: {},
        // answer: 0,
        //false_choice: {}

    }
    componentDidMount(){
        axios.get('/question',{
            headers: { "Authorization": localStorage.getItem('Particip_token') },
        })
            .then(res => {
                console.log(res.data);
            this.setState({
                questions: res.data,
            })
        })
    } 

    
    handleChoice(pAnswer, questionId){
        if (pAnswer === 2) {
            console.log('koko');

            axios.post('/question_token/post',
                {
                    "id_question" : questionId,
                    "participant_answer" : pAnswer,
                    "id_participant" : localStorage.getItem('idAuthP')
                }
            )
            .then(res =>{
                console.log(res.data);
            })
        }
        console.log(pAnswer, questionId);
        // console.log({answer, falseChoice, questionId});
        console.log(localStorage.getItem('idAuthP'));
        console.log(localStorage.getItem('idGroup'));
    }
    render() { 
        const {questions} = this.state;
        
        const questionList = questions ? (

            questions.map((item ,index )=> {
                return (
                    <div key={item._id} className="mt-5">
                        <span className="card bg-primary text-white p-3 my-3">{item.question}</span>
                        <ul className="list-group list-group-flush">
                            <li onClick={() => this.handleChoice((1))} type="button" className="list-group-item">{item.false_choices.choice1}</li>
                            <li onClick={() => this.handleChoice((2),item._id, item.points)} type="button" className="list-group-item">{item.answer}</li>
                            <li onClick={() => this.handleChoice((3))} type="button" className="list-group-item">{item.false_choices.choice2}</li>
                            <li onClick={() => this.handleChoice((4))} type="button" className="list-group-item">{item.false_choices.choice3}</li>
                        </ul>
                    </div>
                )
            })
        ):(
            <div>No Questions yet</div>
        )
        return (
            <center className="container">
                {questionList}
            </center>
        );
    }
}
 
export {Quiz};