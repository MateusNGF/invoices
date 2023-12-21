import ButtonAction from './ButtonComponent';
import './css/NavbarComponent.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className='pages'>
                <a className="navbar-a" href="/dashboard" >DASHBOARD</a>
                <a className="navbar-a" href="/invoices">FATURAS</a>
            </div>
            <ButtonAction type="sucess" size="large" label="IMPORTAR FATURA" onClick={() => {window.location.href = "/upload-invoices"}} />
           
        </div>
    )
}