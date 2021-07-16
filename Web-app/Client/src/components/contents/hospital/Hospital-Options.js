import HospitalHeader from "../../headers/hospital";
import bagRecievedImg from '../../../imgs/bag recieved.jpeg'
import trackBloodImg from '../../../imgs/track blood.jpg'
import bagUsedImg from '../../../imgs/bag used.jpg'
import retrieveprocessImg from '../../../imgs/retrieve process.jpg'
function hospitalOptions(){
    return(
        <div>
            <HospitalHeader/>
            <div id="carouselMultiItemExample" className="carousel slide carousel-dark text-center" data-mdb-ride="carousel">

<div className="carousel-inner py-4" >
 
  <div className="carousel-item active">
    <div className="container">
      <div className="row" id='row'>
        <div className="col-md-3" id ="col-lg-44">
          <div className="card">
            <img
              src={bagRecievedImg}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Blood Bag Recieved</h5>
              <p className="card-text">
                When you recieve a blood bag, you can confirm here.
              </p>
              <a href="/" className="btn btn-danger">Confirm</a>
            </div>
          </div>
        </div>

        <div className="col-md-3 d-none d-lg-block" id="col-lg-43">
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

        <div className="col-md-3 d-none d-lg-block" id="col-lg-42">
          <div className="card">
            <img
              src={bagUsedImg}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Blood Bag Used</h5>
              <p className="card-text">
                When you use a Blood Bag you should confirm here.
              </p>
              <a href="/" className="btn btn-danger">Confirm</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 d-none d-lg-block" id="col-lg-41">
          <div className="card">
            <img
              src={retrieveprocessImg}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Retrieve Processes</h5>
              <p className="card-text">
                If you want to retrieve all your proccesses press here.
              </p>
              <a href="/" className="btn btn-danger">Retrieve</a>
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
export default hospitalOptions;