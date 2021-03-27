import axios from 'axios';
import React, { Component } from 'react';
import giftImg from "../../assets/win.jpg";
class Winner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners:{},
            participantWin:{}
        };
    }

    async getWinner(){
        await axios.get('/groupMember/'+ localStorage.getItem('idGroup')).then(
            gStory => {
            

            const pScore = [gStory.data.id_participant[0].score, gStory.data.id_participant[1].score, gStory.data.id_participant[2].score,gStory.data.id_participant[3].score];

            for (let i = 0; i < gStory.data.id_participant.length; i++) {
                const pWinner = gStory.data.id_participant[i];
                // console.log(pWinner.score);

                if (Math.max(...pScore) === pWinner.score) {
                    console.log('ok');
                    this.setState({
                        winners: Math.max(...pScore),
                        participantWin: pWinner,
                    })
                }
                
            }
            
            
        })
        
    }
    componentDidMount(){
        this.getWinner();
    }

    render() { 
        const {winners, participantWin} = this.state;
        // console.log(participantWin);
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
                        <strong className="shadow mb-5 rounded p-2 text-warning"><div className="mt-3">{participantWin.full_name} </div><br/> 
                            <i className="text-dark bg-light rounded px-2 m-3">{(participantWin.score)}</i><br/>
                            <i className="fas fa-trophy m-3" style={{fontSize:'90px'}}></i>  
                        </strong>
                    </h3>
                </div>          
            </center>
        );
    }
}
 
export {Winner};