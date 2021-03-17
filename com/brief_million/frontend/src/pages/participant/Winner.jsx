import axios from 'axios';
import React, { Component } from 'react';
import giftImg from "../../assets/win.jpg";
class Winner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners:[],
        };
    }

    async getWinner(){
        await axios.get('/final_winner')
        .then(fWin=>{
            console.log(fWin.data);
            this.setState({
                winners: fWin.data,
            })
        })
    }
    componentDidMount(){
        this.getWinner();

    }

    render() { 
        const {winners} = this.state;
        console.log(winners);
        return (
            <center className="container my-5">
                {winners.map(key=>{
                    return(
                        <div className="card">
                            <img src={giftImg} alt={giftImg}/>
                            <h3 
                                style={{marginTop:'50px',
                                position:'absolute', 
                                right:'40%', 
                                left:'40%',
                                top:'20%', 
                                bottom:'40%', 
                                display:'flex', 
                                justifyContent:'center'}}>
                                <strong className="shadow mb-5 rounded p-2 text-warning">{key.id_participant.full_name} 
                                    <i className="fas fa-trophy m-3" style={{fontSize:'90px'}}></i> <br/> 
                                    <i className="text-dark bg-light rounded px-2">{(key.final_score)}</i>
                                </strong>
                            </h3>
                        </div>
                    )
                })}
            </center>
        );
    }
}
 
export {Winner};