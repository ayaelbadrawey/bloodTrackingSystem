import { findDOMNode } from 'react-dom';
import {useHistory} from 'react-router-dom'
import HospitalHeader from '../../headers/hospital'
import $ from 'jquery'
import { Component } from 'react';
import Connect from './connectRecieve';
import Axios from 'axios';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';
import axioss from './axios'


export class TestFn extends Component{
    constructor(props){
      super(props)
      this.state={
        posts:[]
      }
    }

    componentDidMount(){
      axios.get('http://localhost:5000/query/bag?id=BD576:O-')
      .then(response =>{
        console.log(response);
        alert(response.data.output)
        this.setState({posts:response.data.output})
      })
      .catch(error=>{
        console.log(error)
      })
    }

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
          <input type="text" name="" required=""/>
          <label>Enter Blood Bag ID</label>
        </div>
        <button id="confirm" onClick={}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Confirm
        </button>
        <div>
          output
          {
            posts.length ?
            <div key={posts.DIN}> {posts}</div>:
            null
          }
        </div>
      </form>
    </div>
    </div>
    </div>  
    );
    
  }
}