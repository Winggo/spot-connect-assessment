import './TableCell.css'

function TableCell(props) {
  return (
    <div className="table-cell">
      {props.children}
    </div>
  )
}

export default TableCell
