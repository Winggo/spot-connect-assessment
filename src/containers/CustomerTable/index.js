import { useState } from 'react'

import Table from '../../components/Table'
import CustomerDetails from './CustomerDetails'
import './index.css'
import defaultCustomers from '../../data/customers.json'
import { isValidNumber } from '../../helpers/numbers'

export const DETAILS_TYPE_READ = "READ"
export const DETAILS_TYPE_ADD = "ADD"
export const DETAILS_TYPE_UPDATE = "UPDATE"
export const DETAILS_TYPE_DELETE = "DELETE"

const headerValues = [
  { id: 1, value: 'Name' },
  { id: 2, value: 'Number of Items' },
  { id: 3, value: 'Total Price' },
  { id: 4, value: 'Edit', onClick: () => {} }, // simple way of indicating action column
  { id: 5, value: 'Delete', onClick: () => {} },
]

function CustomerTable() {
  const [customers, setCustomers] = useState(defaultCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [detailsType, setDetailsType] = useState(DETAILS_TYPE_READ)

  // Transforms customer data in `json` format
  // to `<Table /> props` format
  const transformCustomersToProps = (customers) => {
    return customers.map((customer = {}) => {
      return {
        id: customer.id,
        values: [
          { id: 'name', value: customer.name },
          { id: 'numItems', value: customer.numItems },
          { id: 'amount', value: customer.amount },
        ]
      }
    })
  }

  // Transforms customer data in `<Table /> props` format
  // to `json` format
  const transformPropToCustomer = (customerProps) => {
    const { id: customerId, values = [] } = customerProps
    const [name, numItems, amount] = values
    return {
      id: customerId,
      name: name.value,
      numItems: numItems.value,
      amount: amount.value,
    }
  }

  const addActionsColumm = (rows) => {
    return rows.map(({ id, values } = {}) => ({ id, values: [...values, ...actionCells] }))
  }

  const onClickRead = (customerToRead = {}) => {
    if (!customerToRead) return
    setSelectedCustomer(transformPropToCustomer(customerToRead))
    setDetailsType(DETAILS_TYPE_READ)
  }

  const onClickAdd = (customerToAdd = {}) => {
    if (!customerToAdd) return
    setSelectedCustomer(null)
    setDetailsType(DETAILS_TYPE_ADD)
  }

  const onClickEdit = (customerToEdit) => {
    if (!customerToEdit) return
    setSelectedCustomer(transformPropToCustomer(customerToEdit))
    setDetailsType(DETAILS_TYPE_UPDATE)
  }

  const onClickDelete = (customerToDelete) => {
    if (!customerToDelete) return
    const confirm = window.confirm(`Are you sure you want to delete this entry?`)
    if (!confirm) return

    const filteredCustomers = customers.filter((c) => c.id !== customerToDelete.id)
    setCustomers(filteredCustomers)
    setSelectedCustomer(transformPropToCustomer(customerToDelete))
    setDetailsType(DETAILS_TYPE_DELETE)
  }

  const onSubmitAdd = (newCustomer) => {
    setCustomers([...customers, newCustomer])
    setSelectedCustomer({}) // clear form after adding customer
  }

  const onSubmitEdit = (unsavedCustomer) => {
    const updatedCustomers = customers.map((customer) => {
      if (customer.id !== unsavedCustomer.id) {
        return customer
      } else {
        return unsavedCustomer
      }
    })
    setCustomers(updatedCustomers)
  }

  const tableTitle = (<>
    <div className="table-title-inner">
      Customers List
    </div>
    <button className="table-add-btn" onClick={onClickAdd}>Add</button>
  </>)

  const actionCells = [
    { id: 'edit', value: 'Edit', onClick: onClickEdit },
    { id: 'delete', value: 'Delete', onClick: onClickDelete },
  ]

  return (
    <div className="customer-table">
      <Table
        title={tableTitle}
        headerValues={headerValues}
        values={addActionsColumm(transformCustomersToProps(customers))}
        onRowClick={(selected) => onClickRead(selected)}
      />
      <CustomerDetails
        type={detailsType}
        customer={selectedCustomer}
        onSubmitAdd={onSubmitAdd}
        onSubmitEdit={onSubmitEdit}
      />
    </div>
  )
}

export default CustomerTable
