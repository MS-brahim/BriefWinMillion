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
        currentQuestion: {},
        setCurrentQuestion: {},
        showScore:{},
        setShowScore:{},
        score:{},
        setScore:0

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

    
    handleChoice(answer, falseChoice, questionId){
        
        console.log(answer);
        console.log({answer, falseChoice, questionId});
        console.log(localStorage.getItem('idAuthP'));
        console.log(localStorage.getItem('idGroup'));
    }
    render() { 
        const {questions} = this.state;
        
        const questionList = questions ? (

            questions.map((item ,index )=> {
                return (
                    <div key={item._id} className="">
                        <span className="alert alert-primary">{item.question}</span>
                        <ul className="list-group list-group-flush">
                            <li onClick={() => this.handleChoice((item.answer),(item.false_choices), (item._id))} type="button" className="list-group-item">{item.false_choices.choice1}</li>
                            <li onClick={() => this.handleChoice((item.answer),(item.false_choices), (item._id))} type="button" className="list-group-item">{item.answer}</li>
                            <li onClick={() => this.handleChoice((item.answer),(item.false_choices), (item._id))} type="button" className="list-group-item">{item.false_choices.choice2}</li>
                            <li onClick={() => this.handleChoice((item.answer),(item.false_choices), (item._id))} type="button" className="list-group-item">{item.false_choices.choice3}</li>
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