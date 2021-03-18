import React, { Component } from 'react';
import { Container, Nav, Table } from 'reactstrap';
import {connect} from 'react-redux';
import './dashboard.css';
import Sidebar from '../../components/auth/Sidebar';
import {NavBar} from '../../components/Navbar.jsx';
import axios from 'axios';
class DashboardPage extends Component {
    state = {
        participants:[]
    }

    async getAllParticipant(){
        await axios.get('/participant', {
            headers:{ "Authorization": localStorage.getItem('token')}
        })
            .then(res => {
                console.log(res);
            this.setState({
                participants: res.data,
            })
        })
    }

    componentDidMount(){
        this.getAllParticipant()
    }

    handleValidParticipant(id){
        axios.patch('/participant/validateParticipant/'+id)
        .then(res=>{
            console.log(res.data);
            alert('paraticipant has validate')
        })
    }

    render() { 
       const {participants} = this.state;
       console.log(participants);
       const participantList = participants ? (
        participants.map((item ,index )=> {
            let isValid ="";
            if (item.is_valid===true) {
                isValid= <i className="fas fa-check-circle text-success" Disabled></i>
            }else{
                isValid= <button onClick={() => this.handleValidParticipant(item._id)} className="btn btn-sm btn-danger">valid</button>
            }
            return (
                <tr key={item._id}>
                    <th scope="row">{index+1}</th>
                    <td>{item.full_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone }</td>
                    <td>{item.age}</td>
                    <td>{isValid}</td>
                </tr>
            )
        })
        ):(
            <div>No Partcipants yet</div>
        )
        return (
            
            <div>
                <NavBar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <Container className="mt-4">
                        <div className="bg-dark text-white pl-3 p-2"><b>Data Table All Partcipants</b></div>
                        <Table bordered>
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Full name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Age</th>
                                    <th>Accept</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participantList}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>
        );
    }
}

const Dashboard = connect()(DashboardPage)
export {Dashboard};