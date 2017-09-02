import React from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import { Col, Button } from 'react-bootstrap';


function handleActive(e){
  const activeTabs = document.getElementsByClassName("active-tab");
  if (activeTabs){
    for (var i = 0; i < activeTabs.length; i++) {
      activeTabs[i].className = "";
    }
  }
  e.target.className = "";
  e.target.className = "active-tab";

}
const OfferTabs = (props) => (
  <Col xs={10} className="product-info-tabs col-xs-offset-1">
    <Tabs inkBarStyle={{'display': 'none'}} className="tab-container">
      <Tab label="Overview" className="tabs active-tab" style={{'background': '#fff', color: '#CDCDCD'}} onClick={handleActive}>
        <div className="tab-content">
          <h2 className="tab-content-title">Tab One</h2>
          <p>
            This is an example tab.
          </p>
          <p>
            You can put any sort of HTML or react component in here. It even keeps the component state!
          </p>
        </div>
      </Tab>
      <Tab label="Ratings" className="tab" onClick={handleActive}>
        <div className="tab-content">
          <h2 className="tab-content-title">Tab Two</h2>
          <p>
            This is another example tab.
          </p>
        </div>
      </Tab>
      <Tab label="Seller Info" className="tab" onClick={handleActive}>
        <div className="tab-content">
          <h3 className="tab-content-title">Seller Name</h3>
          <p>
            This is a third example tab.
          </p>
           <RaisedButton label="View Profile" className="btn-green" />
        </div>
      </Tab>

      <Tab label="FAQ" className="tab" onClick={handleActive}>
        <div className="tab-content">
          <h2 style={props.styles.headline}>Tab Three</h2>
          <p>
            FAQ TAB
          </p>
        </div>
      </Tab>
    </Tabs>
  </Col>
)

export default OfferTabs;
