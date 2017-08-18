import React from 'react';
import { Col } from 'react-bootstrap';
import ItemBrowser from './ItemBrowser';

/**
 * class GridsViewItemsBrowser
 *
 * Offer with details in grid
 */
class GridsViewItemsBrowser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items.map(item => (
      <div key={item.txid} className="grid-container col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="grid-media-content">
          <ItemBrowser data={item} />
        </div>
        <div className="grid-text-content">
          <span className="title">{item.title}</span>
          <span className="price">{item.price + item.currency}</span>
        </div>
      </div>
			));

    return (
      <Col xs={12} className="grids">
        {items}
      </Col>
    );
  }
}

export default GridsViewItemsBrowser;
