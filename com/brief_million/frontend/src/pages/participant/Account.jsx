import {Button, Card, CardBody, CardHeader, CardText, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {fetchGroupMember} from '../../actions/account_actions';
import { Spinner } from '../../components/Spinner';
import { NavBar } from '../../components/Navbar.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
const socket = io();


class AccountPage extends Component {
    
    componentDidMount(){
        const {fetchGroupMember} = this.props;
        fetchGroupMember();
        socket.on('grpMemeber',() =>{
            fetchGroupMember();
        });

        socket.on("start game", () => {
            this.props.history.push('/start-quiz');
        });
    }

    joionToGroup(id){
        // console.log(id);
        console.log(localStorage.getItem('idAuthP'));
        axios.put('/groupMember/join/'+id,
            {id_participant:[localStorage.getItem('idAuthP')]}
        )
        .then(res =>{
            socket.emit('joinToGrooup', res.data)
            console.log(res.data);
        }).then(()=>{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
              
            Toast.fire({
                icon: 'success',
                title: 'Join in successfully'
            })
        })

    }

    // Start Game 
    startQuiz(id){
        // console.log(id);
        localStorage.setItem('idGroup', id);
        socket.emit('quiz')
    }
    
    formAddGroup () {
        console.log(localStorage.getItem('idAuthP'));
        axios.post('/groupMember/post',
            {id_participant:[localStorage.getItem('idAuthP')]}
        )
        .then(res =>{
            console.log({group:res.data});
            socket.emit('group',  res.data)
        }).then(()=>{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
              
            Toast.fire({
                icon: 'success',
                iconColor:'white',
                title: '<span class="text-white">Created Group in successfully</span>',
                background:'green'
            })
            
        })   
    }
    
    render() { 
        const {groupsMember, fetching} = this.props.groupsMember;
        if (fetching) {
            return <Spinner/>
        }
        // console.log(groupsMember);
        // {console.log(localStorage.getItem('idAuthP'))}
        return (
            
            <div>  
                <NavBar/> 
                <Row xs="1" sm="2" md="4" className="m-4">
                    <Col className="mt-4">
                        <Card id="fromGroup">
                            <CardBody
                                onClick={()=>this.formAddGroup()}
                                type="button"
                                className="d-flex align-items-center m-auto text-light">
                                <i className="fas fa-plus-square"style={{ 
                                    fontSize: 150,
                                }}>
                                </i>
                            </CardBody>
                        </Card>
                    </Col>
                    {(groupsMember).map((item, i) => (
                        <Col key={item._id} className="mt-4">
                            <Card>
                                <CardHeader className='bg-dark text-white'><b>Group : <i className="text-primary">{item.group_code}</i></b>
                                    <div className="float-right">
                                        <Button onClick={()=> this.joionToGroup(item._id)} className="btn btn-light btn-sm">JOIN</Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <CardText>
                                        <b>
                                            {item.id_participant.map((objP)  => 
                                                {
                                                    let onOff = objP.online;
                                                    if(onOff===true)
                                                    {return (
                                                        <div key={objP._id} ><i className="fas fa-user"></i> {objP.full_name} <small className="float-right text-success"><i className="fas fa-circle"></i></small></div>
                                                    )}
                                                    else{return( 
                                                        <div key={objP._id} ><i className="fas fa-user"></i> {objP.full_name}</div>
                                                    )}
                                                }
                                            )}
                                        </b> 
                                    </CardText>
                                </CardBody>
                                <Button type="button" className="btn btn-dark" onClick={()=> this.startQuiz(item._id)}>
                                    Start
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}
const mapStateToProps = (groupsMember) => {
     return {
        fetching: groupsMember.fetching,
        groupsMember: groupsMember.groupsMember
    };
};
const Account = connect(mapStateToProps, {fetchGroupMember})(AccountPage)
export {Account};