import { findDOMNode } from 'react-dom';
import {useHistory} from 'react-router-dom'
import HospitalHeader from '../../headers/hospital'
import $ from 'jquery'
import { Component } from 'react';
import Connect from './connectRecieve';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { EventEmitter } from 'events';


export class TestFn extends Component{
    constructor(props){
      super(props)
      this.state={
        posts:[],
        posts2:[],
        bNumber: null
      }
    }

    test(event){
      event.preventDefault();
      axios.get(`http://localhost:5000/query/bag?id=${this.state.bNumber}`)
      .then(response =>{
        let output = Object.values(response.data);
        let objectOutput = JSON.parse(output[0]);
        console.log("RESPONSE", objectOutput.DIN);
        alert(response.data.output)
        this.setState({posts:response.data.output})
        this.test2(event);
      })
      .catch(error=>{
        console.log("TEST ERROR", error)
      })

    }
    test2(event){
      event.preventDefault();
      axios.get(`http://localhost:5000/get/history?id=${this.state.bNumber}`)
      .then(response =>{
        let output = Object.values(response.data);
        let objectOutput = JSON.parse(output[0]);
        console.log("RESPONSE", objectOutput.DIN);
        alert(response.data.output)
        this.setState({posts2:response.data.output})
      })
      .catch(error=>{
        console.log("TEST ERROR", error)
      })
    }
    handleInoutChange(value){
      this.setState({
        bNumber: value
      })
      console.log("ANAAA",this.state.bNumber)
    }

    //componentDidMount(){
    //}

    render(){
      const {posts} = this.state
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
        <a id="confirm" onClick={(event)=>this.test(event)}>
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