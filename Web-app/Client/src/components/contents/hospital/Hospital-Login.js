import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HospitalHeader from "../../headers/hospital";

function hospitalLogin(){

    return(
<div>
        <HospitalHeader />
        <div className="login-box">
    <h2>Hospital login</h2>
    <form>
      <center>
        <div className="flex-c-m">
        <a href="#" class="login100-social-item bg1">
          <i><FontAwesomeIcon icon = {['fab' ,'yahoo']}/></i>
        </a>
  
        <a href="#" class="login100-social-item bg2">
          <i><FontAwesomeIcon icon = {['fab' ,'google']}/></i>
        </a>
  
        <a href="#" class="login100-social-item bg3">
          <i><FontAwesomeIcon icon = {['fab' ,'linkedin']}/></i>
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
export default hospitalLogin;