import ButtonAction from '../components/ButtonComponent'
import './css/UploadInvoice.css'

export default function UploadInvoice() {
    return (
        <div className="container-upload-invoice">
            <div className="content-upload-invoice">
                <h1>IMPORTAR NOVA FATURA</h1>
                <input type="file" id="invoice-file" placeholder="Selecione um ou varios arquivos"  multiple accept="application/pdf"/>
                <ul id="files-list"></ul>
                <div className="footer-upload-invoice">
                    <ButtonAction onClick={onSubmit} type='sucess' label='IMPORTAR' />
                </div>
            </div>
        </div>
    )
}

function onSubmit(){
    const files = document.getElementById("invoice-file").files
    console.log(files)
}