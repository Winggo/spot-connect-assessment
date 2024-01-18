import './TableCell.css'

function TableCell(props) {
  return (
    <div className={props.onClick ? "table-cell action-cell" : "table-cell"} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default TableCell
