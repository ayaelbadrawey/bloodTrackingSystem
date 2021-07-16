import {useHistory} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function HospitalHeader() {
  let history = useHistory();
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" id="hospitalNav">
        <div className="container">
          <a className="navbar-brand" href="#" id="navbar-brand1" >Blood</a>
          <a className="navbar-brand" href="#" id="navbar-brand2" >Tracking</a>
          <a className="navbar-brand" href="#" id="navbar-brand3" >System</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#" >Home
                      <span className="sr-only">(current)</span>
                    </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="help" href="#" >Help</a>
              </li>
              <li><i id="icon"><FontAwesomeIcon icon="hospital"/></i></li>
              <li><i id="icon1"><FontAwesomeIcon icon ="hospital fa-2x"/></i></li>
          <li id ="hospital">Giza Hospital</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default HospitalHeader;