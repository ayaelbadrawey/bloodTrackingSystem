import { Component } from "react";
import BloodBankHeader from "../../headers/bloodbank";
import $ from 'jquery'
import { findDOMNode } from 'react-dom';

class bloodBankSendBags extends Component{
    button =()=>{
        const button1 = findDOMNode(this.refs.submit);
        $(button1).css("color", "#C31313");
        $(button1).css("background-color", "#FFFAFA");
        $(button1).css("font-weight", "bold");
        $(button1).css("border-radius", "5px");
        $(button1).html("Confirmed")
        $(button1).attr("class","fas fa-check")
        $(button1).css("text-transform","capitalize")
    }
    render(){
    return(
    <div>
        <BloodBankHeader/>
        <div class="login-box">
    <h2>Info Needed</h2>
    <form>
      <div className="user-box">
        <input type="text" name="" required=""/>
        <label>Enter Blood Bag ID</label>
      </div>
      <a id="button" href="#" onClick={this.button} ref="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Confirm
      </a>
    </form>
  </div>

    </div>
);
}
}
export default bloodBankSendBags;