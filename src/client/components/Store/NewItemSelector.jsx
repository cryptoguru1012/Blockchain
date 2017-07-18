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
import VideoRecord from './VideoRecord';
import VideoRecord2 from './VideoRecord2';
import VideoPlayer from './VideoPlayer';
import ImageEdit from './ImageEdit';
import SubtitlesEditer from './SubtitlesEditer';
import OfferForm from './OfferForm';

// Icons
import VIcon from "./VIcon";

const newItemStyle = {
  loadingDiv: {
    marginTop: '20vh',
    textAlign: 'center',
  },
  icon:{
    textAlign: 'center',
    border: '1px solid green'
  },
  vcenter:{
    display: 'flex',
    alignItems: 'center'
  },
  myButton:{
    borderRadius: '5px',
    margin:'0 0 5px 5%',
    width:'95%'
  },
  FirstCol:{
    textAlign: 'center',
    border: '1px solid red'
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
          <Row style={newItemStyle.loadingDiv}><h2>Create an Offer</h2></Row>
          <Row>
            <Col md={1} style={newItemStyle.FirstCol}></Col>
            <Col md={5} style={newItemStyle.FirstCol}>
              <Row style={newItemStyle.vcenter}>
                <Col xs={1} style={newItemStyle.icon}></Col>
                <Col xs={3} style={newItemStyle.icon}>
                  <VIcon />
                  <CircularProgress size={50} thickness={6} />
                </Col>
                <Col xs={7}  style={newItemStyle.icon}>
                  <Row xs={12} style={newItemStyle.ThirdCol}>
                    <FlatButton
                      href="https://github.com/callemall/material-ui"
                      target="_blank"
                      style={newItemStyle.myButton}
                      label="Record Live Video"
                      labelPosition="before"
                      backgroundColor="rgb(78,172,233)"
                      fullWidth={true}
                      primary={true}
                      icon={<FontIcon className="material-icons">theaters</FontIcon>}
                    />
                  </Row>
                  <Row style={newItemStyle.ThirdCol}>
                    <FlatButton
                      href="https://github.com/callemall/material-ui"
                      target="_blank"
                      label="Upload Video"
                      labelPosition="before"
                      style={newItemStyle.myButton}
                      backgroundColor="rgb(153,211,243)"
                      fullWidth={true}
                      primary={true}
                      icon={<FontIcon className="material-icons">file_upload</FontIcon>}
                    />
                  </Row>
                </Col>
                <Col xs={1} style={newItemStyle.icon}></Col>
              </Row>
            </Col>
            <Col md={5} style={newItemStyle.FirstCol}>
              <Row style={newItemStyle.vcenter}>
                <Col xs={1} style={newItemStyle.icon}></Col>
                <Col xs={3} style={newItemStyle.icon}>
                  <CircularProgress size={50} thickness={6} />
                </Col>
                <Col xs={7}  style={newItemStyle.icon}>
                  <Row style={newItemStyle.ThirdCol}>
                    <h3>Video</h3>
                  </Row>
                  <Row style={newItemStyle.ThirdCol}>
                    <h3>Image</h3>
                  </Row>
                </Col>
                <Col xs={1} style={newItemStyle.icon}></Col>
              </Row>
            </Col>
            <Col md={1} style={newItemStyle.FirstCol}></Col>
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
