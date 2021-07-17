import { findDOMNode } from 'react-dom';
import {useHistory} from 'react-router-dom'
import HospitalHeader from '../../headers/hospital'
import $ from 'jquery'
import { Component } from 'react';
import Connect from './connectRecieve';
import Axios from 'axios';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

function HospitalBagRecieved() {
  let content=null;
  

  /*const ClickHandler = ()=>{
    const {id} = "BD576:O-"
    const url = "http://localhost:5001/query/bag?id=BD500:A-";
    const [out, setOut] = useState([]);
    
    useEffect(() => {
      Axios.get(url)
        .then((response)=> {
           setOut(response.data);
      });
    }, [url]);

    if(out){
      content = out; 
      alert("Friends");
    }
  }*/

  function ClickHandler2(){
    
    // const {id} = "BD576:O-"
    // const url = "http://localhost:5001/query/bag?id=BD500:A-";
    // const [out, setOut] = useState([]);
    
    // useEffect(() => {
    //   Axios.get(url)
    //     .then((response)=> {
    //        setOut(response.data);
    //   });
    // }, [url]);

    // if(out){
    //   content = out; 
    //   alert("Friends");
    // }
    alert("HELLOOO");
  };


  if(!content){
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
        <button id="confirm" type="submit" onClick={ClickHandler2} >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Confirm
        </button>
      </form>
    </div>
    </div>
    </div>  
  );
    }
  else{
    return(
      <div><h1> {content.output}</h1></div>
    )
  }
}

export default HospitalBagRecieved;