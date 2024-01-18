import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { DETAILS_TYPE_ADD, DETAILS_TYPE_UPDATE } from './index'
import './CustomerDetails.css'
import { generateUniqueId, isValidNumber } from '../../helpers/numbers'

const DETAILS_TITLE = {
	READ: 'Customer Details',
	ADD: 'Add Customer',
	UPDATE: 'Edit Customer',
  DELETE: 'Customer Deleted!'
}

function DetailsSection({ type, customer, onSubmitAdd, onSubmitEdit }) {
  const [unsavedCustomer, setUnsavedCustomer] = useState(customer)
  const inputEnabled = [DETAILS_TYPE_ADD, DETAILS_TYPE_UPDATE].includes(type)

  useEffect(() => {
    setUnsavedCustomer(customer)
  }, [customer])

  const handleChange = (event, field) => {
    setUnsavedCustomer({
      ...unsavedCustomer,
      [field]: event.target.value,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // handle converting strings back to numbers
    for (const key in unsavedCustomer) {
      const val = unsavedCustomer[key]
      if (isValidNumber(val)) {
        unsavedCustomer[key] = Number(val)
      }
    }

    if (type === DETAILS_TYPE_ADD) {
      onSubmitAdd({
        ...unsavedCustomer,
        id: generateUniqueId(),
      })
    } else if (type === DETAILS_TYPE_UPDATE) {
      onSubmitEdit(unsavedCustomer)
    }
  }

  return (
    <div className="details-wrapper">
      <div className="details-title">{DETAILS_TITLE[type] ?? type}</div>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="input-container">
          <label>Name:</label>
          <input
            name="name"
            disabled={!inputEnabled}
            type="text"
            value={unsavedCustomer?.name ?? ''}
            onChange={(e) => handleChange(e, "name")}
          />
        </div>

        <div className="input-container">
          <label>Number of Items:</label>
          <input
            name="numItems"
            disabled={!inputEnabled}
            type="text"
            value={unsavedCustomer?.numItems ?? ''}
            onChange={(e) => handleChange(e, "numItems")}
          />
        </div>

        <div className="input-container">
          <label>Total Price:</label>
          <input
            name="amount"
            disabled={!inputEnabled}
            type="text"
            value={unsavedCustomer?.amount ?? ''}
            onChange={(e) => handleChange(e, "amount")}
          />
        </div>

        {inputEnabled ?
          <div className="button-wrapper">
            <button type="submit">Submit</button>
          </div>
        : null}
      </form>
    </div>
  )
}

DetailsSection.propTypes = {
  type: PropTypes.string,
  customer: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
    numItems: PropTypes.number,
    amount: PropTypes.number,
  }),
  onSubmitAdd: PropTypes.func,
  onSubmitEdit: PropTypes.func,
}

export default DetailsSection
