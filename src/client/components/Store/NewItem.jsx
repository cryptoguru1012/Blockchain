import React from 'react';
import { connect } from 'react-redux';

// redux
import { doCategoryReq } from '../../redux/actions/store/category';
import { doCurrencyReq } from '../../redux/actions/store/currency';
import { doItemCreate, showSnackbar } from '../../redux/actions/store/new_item';
import { setRecord, deleteRecord, setOfferForm, updateSubtitles, setDuration } from '../../redux/actions/video';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import VideoRecord from './VideoRecord';
import VideoRecord2 from './VideoRecord2';
import VideoPlayer from './VideoPlayer';
import SubtitlesEditer from './SubtitlesEditer';
import OfferForm from './OfferForm';

const newItemStyle = {
  loadingDiv: {
    marginTop: '30vh',
    textAlign: 'center',
  },
};

class NewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      RecordRTC: false
    }
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getCurrencies();

    if (navigator.mediaDevices) {
      this.setState({
        RecordRTC: true
      });
    }
  }

  render() {
    if (this.props.video.loading) {
      return (
        <Grid>
          <Row>
            <Col xs={12} style={newItemStyle.loadingDiv}>
              <center>
                <CircularProgress size={100} thickness={6} />
              </center>
            </Col>
          </Row>
        </Grid>
      );
    }
    if (this.props.video.videoUploaded) {
      return (
        <Grid>
          <OfferForm
            categories={this.props.categories}
            currencies={this.props.currencies}
            newItem={this.props.newItem}
            onCreate={this.props.onCreate}
            showSnackbar={this.props.showSnackbar}
            urlVideo={this.props.video.url}
            subtitlesVideo={this.props.video.subtitles}
          />
        </Grid>
      );
    }
    if (!this.props.video.recorded || this.props.video.error) {
      return (
        <Grid>
          {this.state.RecordRTC && <VideoRecord onRecorded={this.props.onRecorded} />}
          {!this.state.RecordRTC && <VideoRecord2 onRecorded={this.props.onRecorded} />}
        </Grid>
      );
    }
    return (
      <Grid>
        <VideoPlayer
          url={this.props.video.localUrl}
          onDelete={this.props.onDelete}
          subtitles={this.props.video.subtitles}
          setDuration={this.props.setDuration}
        />
        <SubtitlesEditer
          subtitles={this.props.video.subtitles}
          onSave={this.props.onSave}
          onCancel={this.props.onDelete}
          updateSubtitles={this.props.updateSubtitles}
          videoDuration={this.props.video.videoDuration}
        />
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const video = state.video;
  const categories = state.categories;
  const currencies = state.currencies;
  const newItem = state.newItem;

  return { video, categories, currencies, newItem };
}

function mapDispatchToProps(dispatch) {
  return {
    onRecorded: (data, url) => {
      dispatch(setRecord(data, url));
    },
    onDelete: () => {
      dispatch(deleteRecord());
    },
    onSave: () => {
      dispatch(setOfferForm());
    },
    onCreate: (data) => {
      dispatch(doItemCreate(data));
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

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
