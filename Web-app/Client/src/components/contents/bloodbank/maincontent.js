import {useHistory} from 'react-router-dom'
import BloodBankHeader from '../../headers/bloodbank'

function BloodBankContent() {
  let history = useHistory();
    return (
      <div>
        <BloodBankHeader />
        <h1>Blood bank Content</h1>
        <button onClick={()=>{history.push("/home");}}>go to home</button>
        <button onClick={()=>{history.push("/hospital");}}>go to hospital</button>
        <button onClick={()=>{history.push("/supervision");}}>go to supervision</button>
        <button onClick={()=>{history.push("/user");}}>go to user</button>
      </div>
    );
  }
  
  export default BloodBankContent;