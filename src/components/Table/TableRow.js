import PropTypes from 'prop-types'

import TableCell from './TableCell'
import './TableRow.css'

function TableRow({ id, values, onRowClick }) {
  if (!values) return null
  
  return (
    <div key={id} className="table-row" onClick={() => onRowClick({ id, values })}>
      {values.map(({ id: cellId, value, onClick }, index) => {
        return (
          <TableCell
            key={cellId ?? index}
            onClick={onClick ? (
              (e) => {
                e.stopPropagation()
                return onClick({ id, values }) 
              })
              : null}
          >
            {value}
          </TableCell>
        )
      })}
    </div>
  )
}

TableRow.defaultProps = {
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
  onRowClick: PropTypes.func,
}

export default TableRow
