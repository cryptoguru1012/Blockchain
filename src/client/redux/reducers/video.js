import {
  DELETE_RECORD,
  UPLOAD_START,
  UPLOAD_ERROR,
  UPLOAD_SUCCESS,
  SET_OFFER,
  UPDATE_SUBTITLES,
  SET_VIDEO_DURATION,
} from '../actions/video';
/* eslint no-param-reassign: 0 */  // --> OFF
const initialState = {
  localUrl: null,
  url: null,
  error: null,
  recorded: false,
  loading: false,
  deleted: false,
  subtitles: [],
  videoDuration: 0,
  videoUploaded: false,
};


function setTimetoSeconds(value) {
  let output = 0;
  const match = value.match(/([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3})/);

  if (match) {
    const valuee = value.split(':');
    const h = parseInt(valuee[0]) * 3600;
    const m = parseInt(valuee[1]) * 60;
    const s = parseFloat(valuee[2].replace(',', '.'));

    output = h + m + s;
  }
  return output;
}

function setFormatTime(arr) {
  const newArr = arr;
  newArr.map((a) => {
    a.startTime = setTimetoSeconds(a.startTime);
    a.endTime = setTimetoSeconds(a.endTime);
    return a;
  });
  return newArr;
}

const videoReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_DURATION:
      return { ...state, videoDuration: action.duration };

    case DELETE_RECORD:
      return { ...state, localUrl: null, recorded: false };

    case UPLOAD_START:
      return { ...state, localUrl: action.url, loading: true };

    case UPLOAD_ERROR:
      return { ...state, error: true, loading: false };

    case UPLOAD_SUCCESS:
      return {
        ...state,
        url: action.payload.videoLink,
        recorded: true,
        error: false,
        loading: false,
        subtitles: setFormatTime(action.payload.videoSubs),
      };

    case SET_OFFER:
      return { ...state, videoUploaded: true };

    case UPDATE_SUBTITLES:
      return { ...state, subtitles: action.subtitles };

    default:
      return state;
  }
};

export default videoReducers;
