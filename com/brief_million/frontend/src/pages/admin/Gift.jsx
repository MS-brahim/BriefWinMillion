import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import {connect} from 'react-redux';
import './dashboard.css';
import Sidebar from '../../components/auth/Sidebar';
import {NavBar} from '../../components/Navbar.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

class GiftPage extends Component {
    state = {
        gifts:[]
    }

    async getAllGifts(){
        await axios.get('/gifts', {
            headers:{ "Authorization": localStorage.getItem('token')}
        })
            .then(res => {
                console.log(res);
            this.setState({
                gifts: res.data,
            })
        })
    }

    componentDidMount(){
        this.getAllGifts()
    }

    async postGift(){
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
            }).then(res=>{
                console.log(res.data);
            })
        }
    }

    handleAddGift(){
        alert('heeee')
    }


    render() { 
       const {gifts} = this.state;
       console.log(gifts);
       const giftsList = gifts ? (
        gifts.map((item ,i )=> {
           
            return (
                <div className="col-sm-3" key={item._id}>
                    <div className="card">
                        <img className="card-img-top" src={item.image} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                        </div>
                    </div>
                </div>
            )
        })
        ):(
            <div>No Gifts yet</div>
        )
        return (
            
            <div>
            <NavBar/>
                <div className="d-flex">
                    <Sidebar/>
                    <Container className="mt-4">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="card" onClick={()=>this.handleAddGift()} >
                                    <img className="card-img-top" src="" alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Add New Gift</h5>
                                    </div>
                                </div>
                            </div>
                            {giftsList}
                        </div>
                    </Container>
                </div>                
            </div>
        );
    }
}

const Gifts = connect()(GiftPage)
export {Gifts};