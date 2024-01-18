import Header from './components/Header'
import CustomerTable from './containers/CustomerTable'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header>Today's Purchases</Header>
      <CustomerTable />
    </div>
  )
}

export default App
