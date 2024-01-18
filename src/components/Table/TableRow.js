import PropTypes from 'prop-types'

import TableCell from './TableCell'
import './TableRow.css'

function TableRow({ id, values, renderValue, onRowClick }) {
  return (
    <div key={id} className="table-row" onClick={() => onRowClick({ id, values })}>
      {values.map((value, index) => renderValue(value, index))}
    </div>
  )
}

TableRow.defaultProps = {
  renderValue: ({ id, value } = {}, index) => <TableCell key={id ?? index}>{value}</TableCell>,
  onRowClick: () => {},
}

TableRow.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      value: PropTypes.any,
    })
  ),
  renderValue: PropTypes.func,
  onRowClick: PropTypes.func,
}

export default TableRow
