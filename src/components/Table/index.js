import PropTypes from 'prop-types'

import TableRow from './TableRow'
import './index.css'

function Table ({ title, headerValues = [], values = [], onRowClick }) {
  return (
   <div className="table-wrapper">
      <div className="table-title">
        {title}
      </div>
      <div className="table">
        <TableRow key="header" id="header" values={headerValues} />
        {values.map((row) => (
          <TableRow
            key={row.id}
            id={row.id}
            values={row.values}
            onRowClick={onRowClick}
          />
        ))}
      </div>
   </div>
 )
}

const idPropShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
])

Table.propTypes = {
  title: PropTypes.node.isRequired,
  headerValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: idPropShape.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: idPropShape.isRequired,
      values: PropTypes.array,
    })
  ),
  onRowClick: PropTypes.func,
}

export default Table
