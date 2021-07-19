import BloodBankHeader from "../../headers/bloodbank";

function bloodBankRetrieveBloodBags(){
    return(
        <div>
            <BloodBankHeader/>
            <main className="py-4">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    All Bags
                </div>
                <div className="card-body">
                    <div className="placeholders" >
                      <input type="text" id="filter0" placeholder="Filter By Bag ID"/>
                      <input type="text" id="filter1" placeholder="Filter By Blood Type"/>
                      <input type="text" id="filter2" placeholder="Filter By Donor ID "/>
                      <input type="text" id="filter3" placeholder="Filter By Safety"/>
                      <input type="text" id="filter4" placeholder="Filter By Expirey"/>
                      <input type="text" id="filter5" placeholder="Filter By " hidden/>
                    </div>
                    <table id="filter" className="table">
                        <thead>
                            <tr>
                                <th>Bag ID</th>
                                <th>Blood Type</th>
                                <th>Donor ID</th>
                                <th>Safe</th>
                                <th>Expired</th>
                                <th>Track</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>82376893</td>
                                <td>A</td>
                                <td>D876</td>
                                <td>Yes</td>
                                <td>No</td>
                                <td><a href="#" className="track">track</a></td>
                            </tr>            
                            <tr>
                                <td>45698127</td>
                                <td>O</td>
                                <td>D765</td>
                                <td>Yes</td>
                                <td>No</td>
                                <td><a href="#" className="track">track</a></td>
                            </tr>
                            <tr>
                                <td>39481625</td>
                                <td>O</td>
                                <td>D426</td>
                                <td>Yes</td>
                                <td>No</td>
                                <td><a href="#" className="track">track</a></td>
                            </tr>
                            <tr>
                                <td>560978215</td>
                                <td>AB</td>
                                <td>D539</td>
                                <td>No</td>
                                <td>Yes</td>
                                <td><a href="#" className="track">track</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>    
            </div>
        </div>
    </div>    
</main>
        </div>
    );
}
export default bloodBankRetrieveBloodBags;