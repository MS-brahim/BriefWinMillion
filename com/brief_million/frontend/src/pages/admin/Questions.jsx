import React, { Component } from 'react';
import {Container, Table } from 'reactstrap';
import Sidebar from '../../components/auth/Sidebar';
import {NavBar} from '../../components/Navbar.jsx';

import axios from 'axios';
class Question extends Component {  
    state = {
        questions:[]
    }

    async getQuestion(){
        await axios.get('/question', {
            headers:{ "Authorization": localStorage.getItem('token')}
        })
            .then(res => {
                console.log(res);
            this.setState({
                questions: res.data,
            })
        })
    }
    componentDidMount(){
        this.getQuestion()
    } 
    render() { 
        const {questions} = this.state;
            const questionList = questions ? (
                questions.map((item ,index )=> {
                    return (
                        <tr key={item._id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.question}</td>
                            <td className="text-success">{item.answer}</td>
                            <td className="text-danger">-{item.false_choice1 }<br/>-{item.false_choice2 }<br/>-{item.false_choice3 }</td>
                            <th className="text-center">{item.points}</th>
                        </tr>
                    )
                })
            ):(
                <div>No Questions yet</div>
            )
        return (
            <div>
                <NavBar/>
                <div className="d-flex">
                    <Sidebar/>
                    <Container className="mt-4">
                        <div className="bg-dark text-white pl-3 p-2"><b>All Questions</b> <span type="button" className="float-right" onClick={()=>this.postAdmin()}>Add New Admin +</span></div>
                        <Table bordered>
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>False Chice</th>
                                    <th>Points</th>
                                    <th>Del/Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionList}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>
        );
    }
}
 
export {Question};