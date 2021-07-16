import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomeContent from './components/contents/home'
import HospitalContent from './components/contents/hospital/maincontent'
import BloodBankContent from './components/contents/bloodbank/maincontent'
import SuperContent from './components/contents/supervision/maincontent'
import UserContent from './components/contents/users/maincontent'
import Footer from './components/footer'
import hospitalBagRecieved from './components/contents/hospital/Hospital-Bag-Recieved'
import hospitalBagUsed from './components/contents/hospital/Hospital-Bag-Used'
import hospitalLogin from './components/contents/hospital/Hospital-Login'
import hospitalOptions from './components/contents/hospital/Hospital-Options'
import hospitalTrackBloodBagInfo from './components/contents/hospital/Hospital-TrackBloodBagInfo'
import hospitalTrackingBlood from './components/contents/hospital/Hospital-TrackingBlood'
import {RetrieveBloodBags} from './components/contents/hospital/RetrieveBloodBags'



function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={HomeContent}></Route>
        <Route exact path="/home" component={HomeContent}></Route>
        <Route exact path="/hospital" component={HospitalContent}></Route>
        <Route exact path="/bloodbank" component={BloodBankContent}></Route>
        <Route exact path="/supervision" component={SuperContent}></Route>
        <Route exact path="/user" component={UserContent}></Route>
        <Route exact path="/HospitalBagRecieved" component ={hospitalBagRecieved}></Route>
        <Route exact path="/HospitalBagUsed" component={hospitalBagUsed}></Route>
        <Route exact path="/HospitalLogin" component={hospitalLogin}></Route>
        <Route exact path="/HospitalOptions" component={hospitalOptions}></Route>
        <Route exact path="/HospitalTrackBloodBagInfo" component={hospitalTrackBloodBagInfo}></Route>
        <Route exact path="/HospitalTrackingBlood" component={hospitalTrackingBlood}></Route>
        <Route exact path="/RetrieveBloodBag" component={RetrieveBloodBags}></Route>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
