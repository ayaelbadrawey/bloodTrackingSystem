import {useHistory} from 'react-router-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import BloodBankHeader from '../../headers/bloodbank'
import HomeContent from '../home'
import BloodBankLogin from './login'
import BloodBankDonation from './donation'
import BloodBankOptions from './options'


function BloodBankContent() {
  let history = useHistory();
    return (
      <div>
        <Router>
        <BloodBankHeader /> 
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <button onClick={()=>{history.push("/options");}}>go to options</button>
        <button onClick={()=>{history.push("/login");}}>login</button>
        <button onClick={()=>{history.push("/donation");}}>New Donation</button>
        <button onClick={()=>{history.push("/bloodBagRetrieve");}}>Blood Bags Retrieve</button>
        <button onClick={()=>{history.push("/bloodBagSendBag");}}>send Blood bag</button>
       </Router>
      
      </div>
    );
  }
  
  export default BloodBankContent;