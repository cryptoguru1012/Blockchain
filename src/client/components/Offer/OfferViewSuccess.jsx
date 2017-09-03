import React from 'react';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';
import VideoPlayer from '../Store/VideoPlayer';
import { Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import OfferTabs from "./OfferTabs"

require('./styles/style.scss');

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    color: '#5FA02F',
  },
  bar:{
    backgroundColor: '#5FA02F',
    borderColor: '#5FA02F'
  },
  tab:{
    'color': '#CDCDCD'
  },
  activeTab:{
    'background': '#FFF'
  }
};

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

class OfferViewSuccess extends React.Component {
  constructor(props) {
    super(props);

    const description = this.props.data.description;
    this.state = {
      description: isJson(description) ? JSON.parse(description) : description,
    };
  }

  rendeDescription() {
    return (
      <p>
        {this.state.description}
      </p>
    );
  }

  handleActive(e){
    const activeTabs = document.getElementsByClassName("active-link");
    if (activeTabs){
      for (var i = 0; i < activeTabs.length; i++) {
        activeTabs[i].className = "";
      }
    }
    e.target.className = "";
    e.target.className = "active-link";

  }
  render() {
    return (
      <div>
        <Col xs={6} xsOffset={3}>
          <Tabs inkBarStyle={styles.bar} className="tab-container">
            <Tab label="Browser" onClick={(e) => this.handleActive(e)} style={{'background': '#fff', color: '#CDCDCD'}} className="active-link">
              <div className="hidden">
                <h2 style={styles.headline}>Tab One</h2>
                <p>
                  This is an example tab.
                </p>
                <p>
                  You can put any sort of HTML or react component in here. It even keeps the component state!
                </p>
                <Slider name="slider0" defaultValue={0.5} />
              </div>
            </Tab>
            <Tab label="Sell" onClick={(e) => this.handleActive(e)} style={styles.tab} className="tab">
              <div className="hidden">
                <h2 style={styles.headline}>Tab Two</h2>
                <p>
                  This is another example tab.
                </p>
              </div>
            </Tab>
            <Tab label="Wallet" style={styles.tab} onClick={(e) => this.handleActive(e)} className="tab">
              <div className="hidden">
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>
          </Tabs>
        </Col>
        <Col xs={12}>
          <h2>
            {`Title: ${this.props.data.title}`}
          </h2>
          <h3>
            {`Price: ${this.props.data.price} ${this.props.data.currency}`}
          </h3>
          <h4 style={{ marginBottom: 10 }}>
            {`Quantitiy :${this.props.data.quantity}`}
          </h4>
          <br />

            <div style={{ marginTop: 10 }}>
              <Link
                style={{
                  background: '#f68c8c',
                  border: 'solid 2px #ff6a6a',
                  padding: '8px 20px',
                  borderRadius: '5px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '18px',
                }}
                to="/"
              >
                Back
              </Link>
            </div>
            {/* { this.state.description.urlVideo && isJson(this.props.data.description) && <VideoPlayer
              url={this.state.description.urlVideo}
              subtitles={this.state.description.subtitlesVideo}
            /> }
            { this.state.description.urlImage && isJson(this.props.data.description) && 	<img height="400" width="400"
              src={this.state.description.urlImage || " "}
            /> }
            { !isJson(this.props.data.description) && this.rendeDescription()} */}
          </Col>
          <OfferTabs
            styles={styles} />
        </div>
    );
  }
}

export default OfferViewSuccess;
