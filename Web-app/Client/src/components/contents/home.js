import HomeHeader from '../headers/home'
import {useHistory} from 'react-router-dom'

function HomeContent() {
  let history = useHistory();
    return (
      <div>
        <HomeHeader />
        <h1>Home Content</h1>
        <button onClick={()=>{history.push("/hospital");}}>go to hospital</button>
        <button onClick={()=>{history.push("/bloodbank");}}>go to bloodbank</button>
        <button onClick={()=>{history.push("/supervision");}}>go to supervision</button>
        <button onClick={()=>{history.push("/user");}}>go to user</button>
      </div>
    );
  }
  
  export default HomeContent;