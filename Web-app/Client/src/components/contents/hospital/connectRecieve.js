import HospitalHeader from '../../headers/hospital'
import Axios from 'axios';
import {useState, useEffect} from 'react'

function HospitalBagRecieved( ID ) {

  let content=null;
  const url = `http://localhost:5001/query/bag?id=${ID}`;
  const [out, setOut] = useState(null);


  useEffect(() => {
    Axios.get(url)
      .then((response)=> {
         setOut(response.data);
    });

  }, [url]);
  if(out){
    content = out;
  }
  if(content){
    return(
      <div>
      <HospitalHeader/>
      <div id="rec">
      <div class="login-box">
      <h2>Info Needed</h2>
      <form>
        <div className="user-box">
          <label>Done</label>
          <label>{content.output}</label>
        </div>
      </form>
    </div>
    </div>
    </div>  
  );
    }
  else{
    return(
      <div><h1>ERROR</h1></div>
    )
  }
}
export default HospitalBagRecieved;