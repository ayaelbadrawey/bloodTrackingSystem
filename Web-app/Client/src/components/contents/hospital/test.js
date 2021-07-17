import { findDOMNode } from 'react-dom';
import {useHistory} from 'react-router-dom'
import HospitalHeader from '../../headers/hospital'
import $ from 'jquery'
import { Component } from 'react';
import Connect from './connectRecieve';
import Axios from 'axios';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'


function TestFn(){
    let content = null;
    let [out, setOut] = useState(null);
    function Test1(){
        const {id} = "BD576:O-"
        const url = "http://localhost:5001/query/bag?id=BD576:O-";
        const [data, setData] = useState(null);
 
        useEffect(() => {
          const fetchData = async () => {
            const result = await Axios((url),
            );
            setData(result.data);
          };
          fetchData();
        }, [url]);
        if(data){
          content = data;
          alert(data.output);
        }
       
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
        <button id="confirm" onClick={Test1()} >
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
        return <div>oops</div>
    }
}

export default TestFn;