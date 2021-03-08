// import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, CardText, Col, Row } from 'reactstrap';
// import axios from 'axios';

// class Account extends Component {
//     state = {
//         groups:[]
//     }
    // componentDidMount () {
    //     axios.get('http://localhost:5000/groupMember')
    //         .then(res => {
    //             console.log(res);
    //         this.setState({
    //             groups: res.data,
    //         })
    //     })
    // } 

    // render() { 
    //     const {groups} = this.state;
        //     const groupList = groups ? (
        //         groups.map((item)=> {
        //             return (
                        // <Col>
                        //     <Card key={item._id}>
                        //         <CardHeader><b>Group : <i className="text-primary">{item.group_code}</i></b>
                        //             <div className="float-right">
                        //                 <Button className="btn btn-dark btn-sm" disabled>JOIN</Button>
                        //             </div>
                        //         </CardHeader>
                        //         <CardBody>
                        //             <CardText><b>{item.id_participant.map(fullNameItem => <div className="text-muted"><i className="fas fa-user text-muted"></i> {fullNameItem.full_name}</div>)}</b> </CardText>
                        //         </CardBody>
                        //     </Card>
                        // </Col>
        //             )
        //         })
        //     ):(
        //         <div>No Group yet</div>
        //     )
        // return (
            // <div className="m-4">
            //     <Row xs="1" sm="2" md="4">
            //         <Col>
            //             <Card>
            //                 <CardBody className="text-center text-light">
            //                     <i className="fas fa-plus-square"style={{ 
            //                             fontSize: 100,
            //                         }}>
            //                     </i>
            //                 </CardBody>
            //             </Card>
            //         </Col>
            //         {groupList}
            //     </Row>
            // </div>
        // );
//     }
// }
 
// export  {Account};

import { connect } from 'react-redux';
import React, { Component } from 'react';
import {fetchGroupMember, jointToGroup} from '../../actions/account_actions';
import { Spinner } from '../../components/Spinner';
 
class AccountPage extends Component {
    
    componentDidMount(){
        const {fetchGroupMember, joionToGroup} = this.props;
        fetchGroupMember();
        
    }

    joionToGroup(id){
        console.log(id);
    }
    
    formAddGroup () {
        console.log("hello");

    }
    
    render() { 
        const {groupsMember, fetching} = this.props.groupsMember;
        if (fetching) {
            return <Spinner/>
        }
        // console.log(groupsMember);
        return (
            <div className="m-4">                
                <Row xs="1" sm="2" md="4">
                    <Col>
                        <Card>
                            <CardBody 
                                id="div1"
                                onClick={()=>this.formAddGroup()}
                                type="button"
                                className="d-flex align-items-center m-auto  btn btn-outline-light">
                                <i className="fas fa-plus-square"style={{ 
                                    fontSize: 150,
                                    
                                }}>
                                </i>
                            </CardBody>
                        </Card>
                    </Col>
                    {(groupsMember).map((item, i) => (
                        <Col>
                            <Card key={item._id}>
                                <CardHeader className='bg-dark text-white'><b>Group : <i className="text-primary">{item.group_code}</i></b>
                                    <div className="float-right">
                                        <Button onClick={()=> this.joionToGroup(item._id)} className="btn btn-light btn-sm">JOIN</Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <CardText><b>{item.id_participant.map(fullNameItem => <div className="text-muted"><i className="fas fa-user text-muted"></i> {fullNameItem.full_name}</div>)}</b> </CardText>
                                </CardBody>
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