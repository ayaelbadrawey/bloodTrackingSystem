import {useHistory} from 'react-router-dom'
import BloodBankHeader from '../../headers/bloodbank'
import newDonationImg from '../../../imgs/new donation.jpg'
import trackBloodImg from '../../../imgs/track blood.jpg'
import sendBagImg from '../../../imgs/send bag.jpg'


function BloodBankOptions() {
  let history = useHistory();
  return(
    <div>
        <BloodBankHeader/>
        <div id="carouselMultiItemExample" className="carousel slide carousel-dark text-center" data-mdb-ride="carousel">

<div className="carousel-inner py-4" >

<div className="carousel-item active">
<div className="container">
  <div className="row" id='row'>
    <div className="col-lg-4" id ="col-lg-44">
      <div className="card">
        <img
          src={newDonationImg}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">New Donation</h5>
          <p className="card-text">
          If you want to submit new donation, you can submit here.
          </p>
          <a href="/" className="btn btn-danger">Submit</a>
        </div>
      </div>
    </div>

    <div className="col-lg-4 d-none d-lg-block" id="col-lg-43">
      <div className="card">
        <img
          src={trackBloodImg}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Track a Blood Bag</h5>
          <p className="card-text">
          If you want to track a specific bag, you can submit info here.
          </p>
          <a href="/" className="btn btn-danger">Track</a>
        </div>
      </div>
    </div>

    <div className="col-lg-4 d-none d-lg-block" id="col-lg-42">
      <div className="card">
        <img
          src={sendBagImg}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Send a Blood Bag</h5>
          <p className="card-text">
          If you need to send a Blood Bag, Submit info here.
          </p>
          <a href="/" className="btn btn-danger">Submit</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>

    </div>
);
  }
  
  export default BloodBankOptions;