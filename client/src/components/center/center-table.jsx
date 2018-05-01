import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CenterTable = ({ center }) => (
  <Table definition>
    <Table.Header>
      <Table.Row className="table-row-header">
        <Table.HeaderCell colSpan="2">Information about this center</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Hall Capacity</Table.Cell>
        <Table.Cell>{center.hallCapacity} Guests</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Carpark Capacity</Table.Cell>
        <Table.Cell>Can occupy up to {center.carParkCapacity} Cars</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Price</Table.Cell>
        <Table.Cell>&#8358; {center.price} Per Event</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Facilities</Table.Cell>
        <Table.Cell>{center.facilities && center.facilities.join(' ,  ')}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

CenterTable.propTypes = {
  center: PropTypes.objectOf(() => null)
};

CenterTable.defaultProps = {
  center: {}
};

export default CenterTable;

