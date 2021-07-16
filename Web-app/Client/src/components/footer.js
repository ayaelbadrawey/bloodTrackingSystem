import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer() {
    return (
      <div>
        <footer class="site-footer">
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-sm-6 col-xs-12">
          <p className="copyright-text">Copyright &copy; 2021-Blood Tracking System. All Rights Reserved</p>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12">
          <ul className="social-icons">
            <li><a id="f" className="facebook" href="#"><i><FontAwesomeIcon icon = {['fab' ,'facebook']}/></i></a></li>
            <li><a id="t" className="twitter" href="#" ><i><FontAwesomeIcon icon = {['fab' ,'twitter']}/></i></a></li>
            <li><a id="i" className="instagram" href="#"><i><FontAwesomeIcon icon = {['fab' ,'instagram']}/></i></a></li>
            <li><a id="l" className="linkedin" href="#"><i><FontAwesomeIcon icon = {['fab' ,'linkedin']}/></i></a></li>   
          </ul>
        </div>
      </div>
    </div>
  </footer>
      </div>
    );
  }
  
  export default Footer;