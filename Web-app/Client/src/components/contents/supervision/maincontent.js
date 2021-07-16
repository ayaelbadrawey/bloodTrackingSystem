import {useHistory} from 'react-router-dom'
import SuperHeader from '../../headers/supervision'

function SuperContent() {
  let history = useHistory();
    return (
      <div>
        <SuperHeader />
        <h1>Supervision Content</h1>
        <button onClick={()=>{history.push("/home");}}>go to home</button>
        <button onClick={()=>{history.push("/hospital");}}>go to hospital</button>
        <button onClick={()=>{history.push("/bloodbank");}}>go to bloodbank</button>
        <button onClick={()=>{history.push("/user");}}>go to user</button>
      </div>
    );
  }
  
  export default SuperContent;