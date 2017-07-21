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
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import {grey500, grey600} from 'material-ui/styles/colors';
import VideoRecord from './VideoRecord';
import VideoRecord2 from './VideoRecord2';
import VideoPlayer from './VideoPlayer';
import ImageEdit from './ImageEdit';
import SubtitlesEditer from './SubtitlesEditer';
import OfferForm from './OfferForm';

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
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    opacity: '0'
  },
  overlay: {
      position: 'fixed', 
      display: 'block',
      width: '100%', 
      height: '100%', 
      top: '0', 
      left: '0',
      right:'0',
      bottom:'0',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: '99',
      cursor: 'pointer'
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
};

class NewItemSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextStp: 'selector'
    };
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getCurrencies();
  }
  
  changeStep(step) {
    this.setState({'nextStp': step});
  }

  showOfferForm(){
    return (
      <Grid>
        <OfferForm
          categories={this.props.categories}
          currencies={this.props.currencies}
          newItem={this.props.newItem}
          onCreate={this.props.onCreate}
          showSnackbar={this.props.showSnackbar}
          urlVideo={this.props.video.url}
          urlImage={this.props.image.data.location}
          subtitlesVideo={this.props.video.subtitles}
        />
      </Grid>
    )
  }

  openFileDialog() {
    var fileUploadDom = React.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }
  
  onDrop(file) {
    const media = file.length > 0 ? file[0] : file
    const formData = new FormData();
    window.clearInterval(self.intervalTrigger);

    if(media.type.includes("image/")){
      formData.append('photos', media );
      this.props.imageUploaded( formData );
    }
    else if(media.type.includes("video/")){
      const url = media.preview
      formData.append('video', media, 'videoRecorded.webm');
      this.props.onRecorded(formData, url);
      }
      else
         this.setState({open: true});
  }
 
  render() {
    let output;
    if (this.state.nextStp === 'selector') {
      output = (
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
                      style={newItemStyle.buttonUp}
                      label="Record Video"
                      labelPosition="before"
                      backgroundColor="rgb(78,172,233)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">videocam</FontIcon>}
                      onClick={() => {this.changeStep('liveVideo')}}
                    />
                  </Row>
                  <Row>
                    {console.log('loading: ', this.props.image.loading)}
                    <FlatButton
                      label="Upload Video"
                      labelPosition="before"
                      style={newItemStyle.buttonDown}
                      backgroundColor="rgb(153,211,243)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">file_upload</FontIcon>}
                      containerElement="label"
                      onClick={ (e) => this.openFileDialog}>
                      <Dropzone 
                        style={{"display" : "none"}}
                        onDrop={ (file) => this.onDrop(file)} />
                    </FlatButton>
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
                      style={newItemStyle.buttonUp}
                      label=" Take A Photo "
                      labelPosition="before"
                      backgroundColor="rgb(75, 165, 97)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">photo_camera</FontIcon>}
                      onClick={() => {this.changeStep('takePhoto')}}
                    />
                  </Row>
                  <Row>
                    <FlatButton
                      label="Upload Photo"
                      labelPosition="before"
                      style={newItemStyle.buttonDown}
                      backgroundColor="rgb(153, 202, 165)"
                      hoverColor={grey600}
                      primary={true}
                      icon={<FontIcon className="material-icons">file_upload</FontIcon>}
                      containerElement="label"
                      onClick={ (e) => this.openFileDialog}>
                      <Dropzone 
                        style={{"display" : "none"}}
                        onDrop={ (file) => this.onDrop(file)} />
                    </FlatButton>
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
              label="Continue with no media"
              style={newItemStyle.buttonNoMedia}
              backgroundColor={grey600}
              hoverColor={grey500}
              primary={true}
              icon={<FontIcon className="material-icons">close</FontIcon>}
              onClick={() => {this.changeStep('finalForm')}}
            />
            </Col>
          </Row>
        </Grid>
      );
    };
    if (this.state.nextStp === 'liveVideo') {
      output = (<VideoRecord  onRecorded={this.props.onRecorded} imageUploaded={this.props.imageUploaded} image={this.props.image}/>);
    };
    if (this.state.nextStp === 'takePhoto') {
      output = (<h1><br/>--> Take A Photo</h1>);
    };
    if (this.state.nextStp === 'finalForm') {
      output = this.showOfferForm();
    };
    return(
      <div>
        {(this.props.video.loading || this.props.image.loading) && 
          <div style={newItemStyle.overlay} >
              <CircularProgress style={newItemStyle.loading} size={80} thickness={6} />
          </div>
        }
        {output}
      </div>)
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
