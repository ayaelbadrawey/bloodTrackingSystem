import HospitalHeader from "../../headers/hospital";
import {useHistory} from 'react-router-dom'
import { Component } from "react";
import $ from 'jquery'
import { findDOMNode } from 'react-dom';
import axios from 'axios'
class hospitalBagUsed extends Component{
  constructor(props){
    super(props)
    this.state={
      bNumber: null,
      patientID: null,
      processID: null
    }
  }

  TrigerAxios(event){
    event.preventDefault();
    const currentDate2 = new Date();
    const date = currentDate2.getDate() +'/'+(currentDate2.getMonth()+1) +'/'+currentDate2.getFullYear()
    const time = currentDate2.getHours() +':'+currentDate2.getMinutes() +':'+currentDate2.getSeconds()
    const currentDate = date + " " + time  
    axios.get(`http://localhost:5001/third/state?id=${this.state.bNumber}&pid=${this.state.patientID}&time=${currentDate}`)
    .then(response =>{
      let output = Object.values(response.data);
      alert("DONE")
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
    .then(response =>{
      let output = Object.values(response.data);
      let objectOutput = JSON.parse(output[0]);
      this.TrigerAxios3(event);
      console.log("RESPONSE", objectOutput.DIN);
      alert("Confirmed")
    })
    .catch(error=>{
      console.log("TEST ERROR", error)
    })
  }
  TrigerAxios3(event){
    event.preventDefault();
    const currentDate2 = new Date();
    const date = currentDate2.getDate() +'/'+(currentDate2.getMonth()+1) +'/'+currentDate2.getFullYear()
    const time = currentDate2.getHours() +':'+currentDate2.getMinutes() +':'+currentDate2.getSeconds()
    const currentDate = date + " " + time  
    axios.get(`http://localhost:5001/create/process?pin=${this.state.processID}&id=${this.state.bNumber}&uid=${this.state.patientID}&oid=H102&type=recieve&time=${currentDate}`)
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
  handleInoutChange2(value2){
    this.setState({
      patientID: value2
    })
  }
  handleInoutChange3(value3){
    this.setState({
      processID: value3
    })
  }
    usedButton2 = () =>{
      const b = findDOMNode(this.refs.submit2);
        $(b).css("color", "#C31313");
        $(b).css("background-color", "#FFFAFA");
        $(b).css("font-weight", "bold");
        $(b).css("border-radius", "5px");
        $(b).html("Submitted with ID:U5826956");
        $(b).css("text-transform","capitalize");
        $(b).attr("class","fas fa-check");
    }
    usedButton =() =>{
      const b2 = findDOMNode(this.refs.submit);
            $(b2).css("color", "#C31313");
            $(b2).css("background-color", "#FFFAFA");
            $(b2).css("font-weight", "bold");
            $(b2).css("border-radius", "5px");
            $(b2).html("Submitted")
            $(b2).css("text-transform","capitalize")
            $(b2).attr("class","fas fa-check")
    }
  render(){
return(

    <div>
        <HospitalHeader />
         <div className="new-box">
    <h2>Info Needed</h2>
    <form>
    <div className="new-user-box">
        <input type="text" value={this.state.processID} onChange={(e) =>{this.handleInoutChange3(e.target.value)}}/>
        <label>Enter Process ID</label>
      </div>
      <div className="new-user-box">
        <input type="text" value={this.state.patientID} onChange={(e) =>{this.handleInoutChange2(e.target.value)}}/>
        <label>Enter Patient E-Mail</label>
      </div>
      <div className="new-user-box">
        <input type="text" value={this.state.bNumber} onChange={(e) =>{this.handleInoutChange(e.target.value)}}/>
        <label>Enter Blood Bag ID</label>
      </div>
      <div className="new-user-box">
        <input type="number" name="" required=""/>
        <label>Enter number of Blood Bags</label>
      </div>
      <a id="button1" href="#"onClick={(event)=>this.TrigerAxios(event)} >
        Submit
      </a>
    </form>
  </div>

  </div>
   
);
}
}
export default hospitalBagUsed;