import {useHistory} from 'react-router-dom'
import UserHeader from '../../headers/user'

function UserContent() {
  let history = useHistory();
    return (
      <div>
        <UserHeader />
        <h1>User Content</h1>
        <button onClick={()=>{history.push("/home");}}>go to home</button>
        <button onClick={()=>{history.push("/hospital");}}>go to hospital</button>
        <button onClick={()=>{history.push("/bloodbank");}}>go to bloodbank</button>
        <button onClick={()=>{history.push("/supervision");}}>go to supervision</button>
      </div>
    );
  }
  
  export default UserContent;