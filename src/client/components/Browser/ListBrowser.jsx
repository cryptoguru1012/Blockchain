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
        <GridTile
          key={item.txid}
          title={item.title}
          subtitle={item.price + item.currency}
          className="grid-tile"
        >
          <ItemBrowser data={item} />
        </GridTile>
      );
    });
    return (
      <Row>
        <Col xs={12}>
          <GridList style={styles.gridList}>
            {items}
          </GridList>
        </Col>
      </Row>
    );
  }
}

export default ListBrowser;
