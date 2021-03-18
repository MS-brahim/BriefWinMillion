import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import {connect} from 'react-redux';
import './dashboard.css';
import Sidebar from '../../components/auth/Sidebar';
import {NavBar} from '../../components/Navbar.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

class AdminsPage extends Component {
    state = {
        admins:[]
    }

    async getAllAdmins(){
        await axios.get('/admin', {
            headers:{ "Authorization": localStorage.getItem('token')}
        })
            .then(res => {
                console.log(res);
            this.setState({
                admins: res.data,
            })
        })
    }

    componentDidMount(){
        this.getAllAdmins()
    }

    async postAdmin(){
        const { value: formValues } = await Swal.fire({
            title: 'Add New Admin',
            html:
                '<input id="full_name" class="swal2-input">' +
                '<input id="phone" class="swal2-input">' +
                '<input id="password" type="password" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('full_name').value,
                    document.getElementById('phone').value,
                    document.getElementById('password').value
                ]
            }
          })
          
        if (formValues) {
            Swal.fire(JSON.stringify(formValues))
            axios.post('/admin/post',{
                full_name: formValues[0],
                phone: formValues[1],
                password: formValues[2]
            }).then(resAdmin=>{
                console.log(resAdmin.data);
            })
        }
    }


    render() { 
       const {admins} = this.state;
       console.log(admins);
       const adminList = admins ? (
        admins.map((item ,index )=> {
           
            return (
                <tr key={item._id}>
                    <th scope="row">{index+1}</th>
                    <td>{item.full_name}</td>
                    <td>{item.phone }</td>
                    <td>{item.password}</td>
                </tr>
            )
        })
        ):(
            <div>No Admins yet</div>
        )
        return (
            
            <div>
                <NavBar/>
                <div className="d-flex">
                    <Sidebar/>
                    <Container className="mt-4">
                        <div className="bg-dark text-white pl-3 p-2"><b>Data Table All Partcipants</b> <span type="button" className="float-right" onClick={()=>this.postAdmin()}>Add New Admin +</span></div>
                        <Table bordered>
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Full name</th>
                                    <th>Phone</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminList}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>
        );
    }
}

const Admins = connect()(AdminsPage)
export {Admins};