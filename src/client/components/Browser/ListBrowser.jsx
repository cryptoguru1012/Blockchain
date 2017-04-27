import React from 'react';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { GridList, GridTile } from 'material-ui/GridList';

import ItemBrowser from './ItemBrowser';

require('./styles/list-browser.scss');

const styles = {
  gridList: {
    overflowY: 'auto',
  },
};

class ListBrowser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = this.props.items.map((item) => {
      return (
        <div key={item.txid} className="grid-container col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <div className="grid-media-content">
            <ItemBrowser data={item} />
          </div>
          <div className="grid-text-content">
            <span className="title">{item.title}</span>
            <span className="price">{item.price + item.currency}</span>
          </div>
        </div>
      );
    });
    return (
      <Row>
        <Col xs={12} className="grids">
            {items}
        </Col>
      </Row>
    );
  }
}

export default ListBrowser;
