import './App.css';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Navbar from './components/NavbarComponent';
import UploadInvoice from './pages/UploadInvoice';

function App() {
  let ComponentToRender = null
  
  switch (window.location.pathname){
    case '/dashboard':
      ComponentToRender = Dashboard
      break;
    case '/invoices':
      ComponentToRender = Invoices
      break;
    case '/upload-invoices':
      ComponentToRender = UploadInvoice
      break;
    default:
      ComponentToRender = Dashboard
  }


  return (
    <>
      <Navbar />
      <ComponentToRender />
    </>
  )
}

export default App;
