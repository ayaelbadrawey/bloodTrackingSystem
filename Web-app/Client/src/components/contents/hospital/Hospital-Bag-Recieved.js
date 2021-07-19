import HospitalHeader from '../../headers/hospital'
import $ from 'jquery'
import { Component } from 'react';
import Connect from './connectRecieve';
import axios from 'axios';

export class HospitalBagRecieved extends Component{
    constructor(props){
      super(props)
      this.state={
        bNumber: null,
        currentDateTime: null
      }
    }

    TrigerAxios(event){
      event.preventDefault();
      const currentDate2 = new Date();
      const date = currentDate2.getDate() +'/'+(currentDate2.getMonth()+1) +'/'+currentDate2.getFullYear()
      const time = currentDate2.getHours() +':'+currentDate2.getMinutes() +':'+currentDate2.getSeconds()
      const currentDate = date + " " + time  
      axios.get(`http://localhost:5001/second/state?id=${this.state.bNumber}&time=${currentDate}`)
      .then(response =>{
        let output = Object.values(response.data);
        this.TrigerAxios2(event);
        console.log("Change State Confirmed")
      })
      .catch(error=>{
        console.log("TEST ERROR", error)
      })

    }
    TrigerAxios2(event){
      event.preventDefault();
      const currentDate2 = new Date();
      const date = currentDate2.getDate() +'/'+(currentDate2.getMonth()+1) +'/'+currentDate2.getFullYear()
      const time = currentDate2.getHours() +':'+currentDate2.getMinutes() +':'+currentDate2.getSeconds()
      const currentDate = date + " " + time  
      axios.get(`http://localhost:5001/change/location?id=${this.state.bNumber}&loc=HOSPITAL&oid=BB102&time=${currentDate}`)
      .then(response =>{
        let output = Object.values(response.data);
        let objectOutput = JSON.parse(output[0]);
        console.log("RESPONSE", objectOutput.DIN);
        alert("Confirmed")
      })
      .catch(error=>{
        console.log("TEST ERROR", error)
      })
    }
    handleInoutChange(value){
      this.setState({
        bNumber: value
      })
    }

    render(){
    return(
      <div>
      <HospitalHeader/>
      <div id="rec">
      <div class="login-box">
      <h2>Info Needed</h2>
      <form >
        <div className="user-box">
          <input type="text" value={this.state.bNumber} onChange={(e) =>{this.handleInoutChange(e.target.value)}}/>
          <label>Enter Blood Bag ID</label>
        </div>
        <a id="confirm" onClick={(event)=>this.TrigerAxios(event)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Confirm
        </a>        
      </form>
    </div>
    </div>
    </div>  
    );
      }
}
