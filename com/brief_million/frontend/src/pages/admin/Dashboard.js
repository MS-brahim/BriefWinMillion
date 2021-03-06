import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import {connect} from 'react-redux';
// import {fetchParticipant} from '../../actions/admin_action';
import './dashboard.css';
import Sidebar from '../../components/auth/Sidebar';

class DashboardPage extends Component {
    
    render() { 
       
        return (
            
            <div>
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