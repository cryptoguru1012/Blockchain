import React from 'react';
import { connect } from 'react-redux';

// redux
import { doCategoryReq } from '../../redux/actions/store/category';
import { doCurrencyReq } from '../../redux/actions/store/currency';
import { doItemCreate, showSnackbar } from '../../redux/actions/store/new_item';
import { setRecord, deleteRecord, setOfferForm, updateSubtitles, setDuration } from '../../redux/actions/video';
import { setImage, deleteImage, proceed } from '../../redux/actions/image';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import VideoRecord from './VideoRecord';
import VideoRecord2 from './VideoRecord2';
import VideoPlayer from './VideoPlayer';
import ImageEdit from './ImageEdit';
import SubtitlesEditer from './SubtitlesEditer';
import OfferForm from './OfferForm';
import {grey500, grey600} from 'material-ui/styles/colors';

// Icons
import VIcon from "./VIcon";
import PIcon from "./PIcon";

const newItemStyle = {
  caption: {
    marginTop: '15vh',
    textAlign: 'center',
    marginBottom:'5vh'
  },
  icon:{
    textAlign: 'center',
    border: '1px solid green'
  },
  vcenter:{
    display: 'flex',
    alignItems: 'center',
    marginBottom:'40px'
  },
  buttonUp:{
    borderRadius: '5px',
    margin: '0 0 5px 5%',
    width: '95%',
    color: 'white'
  },
  buttonDown:{
    borderRadius: '5px',
    margin: '5px 0 0 5%',
    width: '95%',
    color: 'white'
  },
  buttonNoMedia:{
    borderRadius: '5px',
    margin: '30px 0 50px 0',
    color: 'white'
  },

};

class NewItemSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      RecordRTC: false
    }
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getCurrencies();
  } 
 
  render() {
    
    return (
        <Grid>
          <Row style={newItemStyle.caption}><h2>Create an Offer</h2></Row>
          <Row>
            <Col md={1}/>
            <Col md={5}>
              <Row style={newItemStyle.vcenter}>
                <Col xs={1}></Col>
                <Col xs={4}>
                  <VIcon />
                </Col>
                <Col xs={7}>
                  <Row>
                    <FlatButton
                      href="https://github.com/callemall/material-ui"
                      target="_blank"
                      style={newItemStyle.buttonUp}
                      label="Record Video"
                      labelPosition="before"
                      backgroundColor="rgb(78,172,233)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">theaters</FontIcon>}
                    />
                  </Row>
                  <Row>
                    <FlatButton
                      href="https://github.com/callemall/material-ui"
                      target="_blank"
                      label="Upload Video"
                      labelPosition="before"
                      style={newItemStyle.buttonDown}
                      backgroundColor="rgb(153,211,243)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">file_upload</FontIcon>}
                    />
                  </Row>
                </Col>
                <Col xs={1} ></Col>
              </Row>
            </Col>
            <Col md={5}>
              <Row style={newItemStyle.vcenter}>
                <Col xs={1}></Col>
                <Col xs={4}>
                  <PIcon />
                </Col>
                <Col xs={7}>
                  <Row>
                    <FlatButton
                      href="https://github.com/callemall/material-ui"
                      target="_blank"
                      style={newItemStyle.buttonUp}
                      label=" Take A Photo "
                      labelPosition="before"
                      backgroundColor="rgb(75, 165, 97)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">photo_camera</FontIcon>}
                    />
                  </Row>
                  <Row>
                    <FlatButton
                      href="https://github.com/callemall/material-ui"
                      target="_blank"
                      label="Upload Photo"
                      labelPosition="before"
                      style={newItemStyle.buttonDown}
                      backgroundColor="rgb(153, 202, 165)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">file_upload</FontIcon>}
                    />
                  </Row>
                </Col>
                <Col xs={1} ></Col>
              </Row>
            </Col>
            <Col md={1}/>
          </Row>
          <Row style={{textAlign: 'center'}}>
            <Col xs={12}>
            <FlatButton
              href="https://github.com/callemall/material-ui"
              target="_blank"
              label="Continue with no media"
              style={newItemStyle.buttonNoMedia}
              backgroundColor={grey600}
              hoverColor={grey500}
              primary={true}
              icon={<FontIcon className="material-icons">close</FontIcon>}
            />
            </Col>
          </Row>
        </Grid>
    );
  }
}

function mapStateToProps(state) {
  const image = state.image;
  const video = state.video;
  const categories = state.categories;
  const currencies = state.currencies;
  const newItem = state.newItem;

  return { image, video, categories, currencies, newItem };
}

function mapDispatchToProps(dispatch) {
  return {
    imageUploaded: (data) => {
      dispatch(setImage(data));
    },
    onRecorded: (data, url) => {
      dispatch(setRecord(data, url));
    },
    onDelete: () => {
      dispatch(deleteRecord());
    },
    onDeleteImage: () => {
        dispatch(deleteImage());
    },
    onSave: () => {
      dispatch(setOfferForm());
    },
    onCreate: (data) => {
      dispatch(doItemCreate(data));
    },
    onProceed: () => {
      dispatch(proceed())
    },
    showSnackbar: () => {
      dispatch(showSnackbar());
    },
    getCategories: () => {
      dispatch(doCategoryReq());
    },
    getCurrencies: () => {
      dispatch(doCurrencyReq());
    },
    updateSubtitles: (subtitle) => {
      dispatch(updateSubtitles(subtitle));
    },
    setDuration: (duration) => {
      dispatch(setDuration(duration));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemSelector);
