import HospitalHeader from "../../headers/hospital";
import ReadyImg from '../../../imgs/ready.png'
import shippedImg from '../../../imgs/Shipped.png'
import deliveredImg from '../../../imgs/delivered.png'
import usedImg from '../../../imgs/used.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function hospitalTrackingBlood(){
    return(
        <div>
            <HospitalHeader/>
        
    <div className="card" id="trackingBlood">
        <div className="row d-flex justify-content-between px-3 top">
          <div>
            <a href="/">
              <i className="info"><FontAwesomeIcon icon = {['fa' ,'info-circle']}/></i>
            </a>
          </div>
            <div className="container">
                <h5>Bag ID: <span className="text-danger font-weight-bold">5168496</span></h5>
            </div>
        </div> 
        
        <div className="row d-flex justify-content-center">
            <div className="col-12">
                <ul id="progressbar" className="text-center">
                    <li className="active step0"></li>
                    <li className="active step0"></li>
                    <li className="active step0"></li>
                    <li className="step0"></li>
                </ul>
            </div>
        </div>
        <div className="row justify-content-between top">
            <div className="row d-flex icon-content col-md-3"> 
            <img id="ready" className="icon" src={ReadyImg}/>
                <div className="d-flex flex-column">
                    <p className="font-weight-bold">Bag is<br></br>Ready</p>
                </div>
            </div>
            <div className="row d-flex icon-content col-md-3" > <img id="shipped" className="icon" src={shippedImg}/>
                <div className="d-flex flex-column">
                    <p className="font-weight-bold">Bag is<br></br>En Route</p>
                </div>
            </div>
            <div className="row d-flex icon-content col-md-3"> <img id="delivered" className="icon" src={deliveredImg}/>
                <div className="d-flex flex-column">
                    <p className="font-weight-bold">Bag<br></br> Delivered</p>
                </div>
            </div>
            <div className="row d-flex icon-content col-md-3"> <img id="used" className="icon" src={usedImg}/>
                <div className="d-flex flex-column">
                    <p className="font-weight-bold">Bag <br></br> Used</p>
                </div>
            </div>
        </div>
        
        
    </div>
</div>
    );
}
export default hospitalTrackingBlood;