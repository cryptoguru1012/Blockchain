import React from 'react';
import { Link } from 'react-router';
import VideoPlayer from '../Store/VideoPlayer';
import FontIcon from 'material-ui/FontIcon';
import { grey500, grey600 } from 'material-ui/styles/colors';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
const styles = {
  imageContainer(url) {
    return {
      width: '100px',
      height: '100px',
      marginRight: '20px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#fff',
      backgroundImage: url,
    };
  },
  videoContainer: {
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'relative',
  },
  video: {
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
  },
  txtHeader: {
    cursor: 'pointer',
  },
  sortIconStyles: {
    marginLeft: '2px',
    color: grey500,
    verticalAlign: 'middle',
    fontSize: 'x-large',
  },
  trSeparator(color) {
    return {
      borderBottom: `1px solid ${color}`,
    };
  },

};

/**
 * Class TableViewItemsBrowser
 *
 * Table view of offers
 */
class TableViewItemsBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.getMedia = this.getMedia.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.state = {
      thSortBy: '',
      thSortAZ: true,
    };
  }

  getMedia(description) {
    if (isJson(description)) {
      description = JSON.parse(description);
      if (description.urlVideo) {
        return {
          type: 'video',
          value: description,
        };
      } else if (description.urlImage) {
        return {
          type: 'image',
          value: description,
        };
      }
      return {
        type: 'text',
        value: description,
      };
    }
    const hasImages = description.match(/https?:\/\/.*\.(?:png|jpg|gif)/g);
    if (hasImages) {
      return {
        type: 'images',
        value: hasImages[0],
      };
    }
    return {
      type: 'texts',
      value: description,
    };

    return false;
  }

    /**
     * Styling based on offer type
     */
  renderMedia(data) {
    if (data.type === 'video') {
      return (
        <div style={styles.videoContainer}>
          <VideoPlayer
            style={styles.video}
            url={data.value.urlVideo}
            subtitles={data.value.subtitlesVideo}
            playOnHover
            hideControls
            fullView
            muted
          />
        </div>
      );
    }
        /*
        ----------------------------------------------------------------
        cortesa --> Exclude Item which not fit types Video, Image, Text
        ----------------------------------------------------------------
         else if(data.type === 'images') {
            const url = `url(${data.value})`
            return (
                <div style={styles.imageContainer(url)}>
                </div>
            )
        }
        ----------------------------------------------------------------
        */
    else if (data.type === 'image') {
      const url = `url(${data.value.urlImage})`;
      return (
        <div style={styles.imageContainer(url)} />
      );
    }
            // if something isn't a VIDEO, IMAGES, IMAGE
  }

  componentDidMount() {
    if (sessionStorage.getItem('catagory')) {
      const data = {
        category: sessionStorage.getItem('catagory').trim(),
      };

      this.props.onSearch(data);
      sessionStorage.removeItem('catagory');
    }
  }

    /**
     * Sort items alphabetically
     */
  sortItems(items) {
    const field = this.state.thSortBy;
    const sortAZ = this.state.thSortAZ;
    let sortedItems;
    if (field === '') {
      return items;
    }

    if (isNaN(parseFloat(items[0][field]))) {
      sortedItems = items.slice(0).sort((a, b) => a[field].localeCompare(b[field], { numeric: true }));
    } else {
      sortedItems = items.slice(0).sort((a, b) => parseFloat(a[field]) - parseFloat(b[field]));
    }

    if (sortAZ) {
      return sortedItems;
    }
    return sortedItems.reverse();
  }

  thClick(field) {
    if (field === this.state.thSortBy) {
      this.setState({ thSortAZ: !this.state.thSortAZ, thSortBy: field });
    } else {
      this.setState({ thSortAZ: true, thSortBy: field });
    }
  }

  render() {
    const itemsOutput = this.sortItems(this.props.items).map((item) => {
      const mediaData = this.getMedia(item.description);
      if (mediaData) {
        return (
          <tr key={item.txid} style={styles.trSeparator(grey500)}>
            {this.props.media && <td>{this.renderMedia(mediaData)}</td>}
            <td><Link to={`/offer/${item.offer}`}>{item.title}</Link></td>
            <td>{item.alias}</td>
            <td>{item.price}</td>
            <td>{item.currency}</td>
          </tr>
        );
      }
      return null;
    });

    const thSortIcon = (field) => {
      const icon = this.state.thSortAZ ? 'arrow_drop_down' : 'arrow_drop_up';
      return (
        <FontIcon
          className="material-icons"
          style={styles.sortIconStyles}
        >
          {(this.state.thSortBy === field && icon) || ' '}

        </FontIcon>
      );
    };

    const icon = this.state.thSortAZ ? 'arrow_drop_down' : 'arrow_drop_up';
    return (
      <table className="grids">
        <thead>
          <tr style={styles.trSeparator(grey600)}>
            {this.props.media && <th>Media</th>}
            <th>
              <a
                style={styles.txtHeader}
                onClick={() => { this.thClick('title'); }}
              >
                                Title
                                {thSortIcon('title')}
              </a>
            </th>
            <th>
              <a
                style={styles.txtHeader}
                onClick={() => { this.thClick('alias'); }}
              >
                                Vendor
                                {thSortIcon('alias')}
              </a>

            </th>
            <th>
              <a
                style={styles.txtHeader}
                onClick={() => { this.thClick('price'); }}
              >
                                Price
                                {thSortIcon('price')}
              </a>
            </th>
            <th>
              <a
                style={styles.txtHeader}
                onClick={() => { this.thClick('currency'); }}
              >
                                Currency
                                {thSortIcon('currency')}
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsOutput}
        </tbody>
      </table>
    );
  }
}
export default TableViewItemsBrowser;
