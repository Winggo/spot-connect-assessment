import { useState } from 'react'

import Table from '../../components/Table'
import CustomerDetails from './CustomerDetails'
import './index.css'

import defaultCustomers from '../../data/customers.json'

export const DETAILS_TYPE_ADD = "ADD"
export const DETAILS_TYPE_READ = "READ"
export const DETAILS_TYPE_UPDATE = "UPDATE"

const headerValues = [
  { id: 1, value: 'Name' },
  { id: 2, value: 'Number of Items' },
  { id: 3, value: 'Total Price' },
  { id: 4, value: 'Actions' },
]

const actionButtons = [
  <button className="edit-customer">Edit</button>,
  <button className="delete-customer">Delete</button>
]

// Transforms customer data in `json` format
// to `<Table /> props` format
function transformCustomers (customers = []) {
  return customers.map(({ id, name, numItems, amount } = {}) => {
    return {
      id,
      values: [
        { id: 'name', value: name },
        { id: 'numItems', value: numItems },
        { id: 'amount', value: amount },
        { id: 'actions', value: actionButtons },
      ],
    }
  })
}

// Transforms customer data in `<Table /> props` format
// to `json` format
function transformSelectedCustomer (customer = {}) {
  const { id: customerId, values = [] } = customer
  const [name, numItems, amount] = values
  const formattedCustomer = {
    id: customerId,
    name: name.value,
    numItems: numItems.value,
    amount: amount.value,
  }
  return formattedCustomer
}

function CustomerTable() {
  const [customers, setCustomers] = useState(defaultCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [detailsType, setDetailsType] = useState(DETAILS_TYPE_ADD)

  return (
    <div className="customer-table">
      <Table
        title="Customers List"
        headerValues={headerValues}
        values={transformCustomers(customers)}
        onRowClick={(val) => {
          setSelectedCustomer(transformSelectedCustomer(val))
        }}
      />
      <CustomerDetails
        type={detailsType}
        customer={selectedCustomer}
      />
    </div>
  )
}

export default CustomerTable
