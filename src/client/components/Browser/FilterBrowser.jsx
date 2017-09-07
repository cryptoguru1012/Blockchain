import React, { PropTypes } from 'react';

import { Row, Col } from 'react-bootstrap';
import FilterLink from './FilterLink';

/**
 * Class FilterBrowser
 *
 * Filtering offers
 * All | Video | Images | Text | Map
 */

/*  class FilterBrowser extends React.Component {

  render() { */

function FilterBrowser(props) {
  const filters = props.items.map((filter, i) =>
    <FilterLink key={i} filter={filter.value}>{filter.name}</FilterLink>);
  return (
    <Row>
      <Col xs={12}>
        <center>
          {filters}
        </center>
      </Col>
    </Row>
  );
}

FilterBrowser.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

FilterBrowser.defaultProps = {
  items: {},
};

export default FilterBrowser;
