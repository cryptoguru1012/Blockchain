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
      var textFlag = item.description.indexOf('http') > -1;
      return (
        <GridTile
          key={item.txid}
          title={item.title}
          subtitle={item.price + item.currency}
          className="grid-tile"
        >
          <div>
            {textFlag
              ? ''
              : <div className="description-only-text">
                <p>
                  {!textFlag ? item.description : ''}
                </p>
              </div>}
            {!textFlag ? <div className="containerItemBrowser col-xs-12" /> : <ItemBrowser data={item} />}

          </div>
        </GridTile>
      );
    });
    return (
      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Col xs={12}>
          <GridList cellHeight={'auto'} style={styles.gridList}>
            {items}
          </GridList>
        </Col>
      </Row>
    );
  }
}

export default ListBrowser;
