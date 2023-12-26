import './App.css';
import Navbar from './components/NavbarComponent';

import DashboardPage from './pages/DashboardPage';
import UploadInvoicePage from './pages/UploadInvoicePage';
import InvoicesPage from './pages/InvoicesPage';

function App() {
  let ComponentToRender = null
  
  switch (window.location.pathname){
    case '/dashboard':
      ComponentToRender = DashboardPage
      break;
    case '/invoices':
      ComponentToRender = InvoicesPage
      break;
    case '/upload-invoices':
      ComponentToRender = UploadInvoicePage
      break;
    default:
      ComponentToRender = DashboardPage
  }


  return (
    <>
      <Navbar />
      <ComponentToRender />
    </>
  )
}

export default App;
