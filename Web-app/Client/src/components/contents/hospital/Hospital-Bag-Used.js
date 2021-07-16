import HospitalHeader from "../../headers/hospital";
import {useHistory} from 'react-router-dom'
import { Component } from "react";
import $ from 'jquery'
import { findDOMNode } from 'react-dom';
class hospitalBagUsed extends Component{
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
    <h2>New Patient</h2>
    <form>
      <div className="new-user-box">
        <input type="text" name="" required=""/>
        <label>Enter Patient E-Mail</label>
      </div>
      <div className="new-user-box">
        <input type="text" name="" required=""/>
        <label>Enter Blood Bag ID</label>
      </div>
      <div className="new-user-box">
        <input type="number" name="" required=""/>
        <label>Enter number of Blood Bags</label>
      </div>
      <a id="button1" href="#" onClick={this.usedButton2} ref="submit2" >
        Submit
      </a>
    </form>
  </div>
  <div class="existing-box">
    <h2>Existing Patient</h2>
    <form>
      <div className="existing-user-box">
        <input type="text" name="" required=""/>
        <label>Enter Patient E-Mail</label>
      </div>
      <div className="existing-user-box">
        <input type="text" name="" required=""/>
        <label>Enter Blood Bag ID</label>
      </div>
      <div className="existing-user-box">
        <input type="number" name="" required=""/>
        <label>Enter number of Blood Bags</label>
      </div>
      <a id="button2" href="#" onClick={this.usedButton} ref="submit">
        Submit
      </a>
    </form>
  </div>
  </div>
   
);
}
}
export default hospitalBagUsed;