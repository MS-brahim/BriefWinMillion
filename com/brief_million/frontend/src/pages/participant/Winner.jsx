import axios from 'axios';
import React, { Component } from 'react';
import giftImg from "../../assets/win.jpg";
class Winner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners:{},
        };
    }

    async getWinner(){
        await axios.get('/groupMember/'+ localStorage.getItem('idGroup')).then(
            gStory => {
            for (let i = 0; i < gStory.data.id_participant.length; i++) {
                const idpInGr = gStory.data.id_participant[i]._id;
                // console.log(gStory.data.id_participant[i].full_name);
                axios.get('/final_winner/'+localStorage.getItem('winID')).then(
                    fWin => {
                        // console.log(fWin.data.id_participant._id);
                        if (idpInGr === fWin.data.id_participant._id) {
                            this.setState({
                                winners: fWin.data,
                            })
                        }
                    }
                )
            }
            
        })
        
    }
    componentDidMount(){
        this.getWinner();
    }

    render() { 
        const {winners} = this.state;
        console.log(winners.id_participant);
        return (
            <center className="container my-5">
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
                        <strong className="shadow mb-5 rounded p-2 text-warning"><div className="mt-3">{
                             
                            
                            
                        
                        } </div><br/> 
                            <i className="text-dark bg-light rounded px-2 m-3">{(winners.final_score)}</i><br/>
                            <i className="fas fa-trophy m-3" style={{fontSize:'90px'}}></i>  
                        </strong>
                    </h3>
                </div>          
            </center>
        );
    }
}
 
export {Winner};