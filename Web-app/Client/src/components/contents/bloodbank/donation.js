import $ from 'jquery'
import { Component } from 'react';
import { render } from '@testing-library/react';
import { findDOMNode } from 'react-dom';
import BloodBankHeader from '../../headers/bloodbank';

class BloodBankDonation extends Component {
  donationButton1 =()=>{
        const button1 = findDOMNode(this.refs.submit);
        $(button1).css("color", "white");
        $(button1).css("background-color", "#C31313");
        $(button1).css("border-radius", "5px");
        $(button1).html("Submitted with <br> patient ID:U5826956 <br> Bag ID:5656665")
        $(button1).css("text-transform","capitalize")
        $(button1).attr("class","fas fa-check fa 0x")
  
    }
    donationButton2 =()=>{
      const button2 = findDOMNode(this.refs.submit2);
      $(button2).css("color", "white");
      $(button2).css("background-color", "#C31313");
      $(button2).css("border-radius", "5px");
      $(button2).html("Submitted with <br> Bag ID:5656665")
      $(button2).css("text-transform","capitalize")
      $(button2).attr("class","fas fa-check")
    }
    render(){
    return (
      <div>
        <BloodBankHeader/>
    <div className='signup-container'>
      <div className='right-container'>
        <header>
          <h1>Blood Info, Be careful!</h1>
          <div className='set'>
            <div className='Date'>
              <label for='Date'>Date</label>
              <input id='Date' placeholder="MM/DD/YYYY" type='date' />
            </div>
            <div className='Expire'>
              <label for='Expire'>Expire</label>
              <input id='Expire' placeholder='MM/DD/YYYY' type='date' />
            </div>
          </div>
          <div className='set'>
              <div className='Test'>
                <label for='Test'>Test</label>
                <input id='Test' placeholder="Secure/Not Secure" type='text' />
              </div>
              <div className='Temperature'>
                <label for='Temperature'>Temperature</label>
                <input id='Temperature' placeholder='20C' type='text' />
              </div>
            </div>
          <div className='longInput'>
              <label for='Millimeters'>Millimeters</label>
              <div className='radio-container'>
                  <input id='Millimeters' placeholder='20C' type='text' />
              </div>   
          </div>
          <div className='longInput'>
              <label for='A+'>Blood Type</label>
              <div className='radio-container'>
                <input id='A+' name='pet-weight' type='radio' value='A+' />
                <label for='A+'>A+</label>

                <input id='B+' name='pet-weight' type='radio' value='B+' />
                <label for='B+'>B+</label>

                <input id='O+' name='pet-weight' type='radio' value='O+' />
                <label for='O+'>O+</label>

                <input id='AB+' name='pet-weight' type='radio' value='AB+' />
                <label for='AB+'>AB+</label>

                <input id='A-' name='pet-weight' type='radio' value='A-' />
                <label for='A-'>A-</label>

                <input id='B-' name='pet-weight' type='radio' value='B-' />
                <label for='B-'>B-</label>

                <input id='O-' name='pet-weight' type='radio' value='O-' />
                <label for='O-'>O-</label>

                <input id='AB-' name='pet-weight' type='radio' value='AB-' />
                <label for='AB-'>AB-</label>
              </div>
            </div>
          <div className='longInput'>
              <label for='Email'>Email</label>
              <div className='radio-container'>
                  <input id='Email' placeholder="Write patient's Email" type='text' />
              </div>   
          </div>
          
        </header>
        <footer>
          <div className='set'>
              <a id="new" href="#" onClick={this.donationButton1} ref="submit" >New Donor</a>
              <a id="existing" href="#" onClick={this.donationButton2} ref="submit2" >Existing Donor</a>
          </div>
        </footer>
      </div>
    </div>
    </div>
    );
  }
  }
  
  export default BloodBankDonation;