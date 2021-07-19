import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGoogle, faLinkedin, faYahoo } from '@fortawesome/free-brands-svg-icons';
import BloodBankHeader from '../../headers/bloodbank';

function BloodBankLogin() {
  let history = useHistory();
 
    return (
        <div>
          <BloodBankHeader/>
          <div className="login-box">
    <h2>Blood-Bank login</h2>
    <form>
      <center>
        <div className="flex-c-m">
        <a href="#" className="login100-social-item bg1">
          <i><FontAwesomeIcon icon="linked-in"></FontAwesomeIcon></i>
        </a>
  
        <a href="#" className="login100-social-item bg2">
          <i><FontAwesomeIcon icon="google"></FontAwesomeIcon></i>
        </a>
  
        <a href="#" className="login100-social-item bg3">
          <i><FontAwesomeIcon icon="yahoo"></FontAwesomeIcon></i>
        </a>
      </div>
    </center>
    <center>
       <a href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Join Us
      </a>
    </center>
    </form>
  </div>

        </div>
    );
  }
  
  export default BloodBankLogin;