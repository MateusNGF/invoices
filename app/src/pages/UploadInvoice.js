import './css/UploadInvoice.css'
import { useState } from 'react'
import axios from 'axios'

import ButtonAction from '../components/ButtonComponent'
import LoadingIndicator from '../components/LoadComponent'
import PreviewPDFComponent from '../components/PreviewPDFComponent';

export default function UploadInvoice() {
    const [fileSelected, setFileSelect] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(false);

    const onChangeFiles = (event) => {
        const inputComponent =  document.getElementById('invoice-file')
        const fileInputSelected  = inputComponent.files[0]
        
        if (!fileInputSelected) return;

        setFileSelect({
            data : fileInputSelected,
            preview: URL.createObjectURL(fileInputSelected),
            name: fileInputSelected.name,
            size: fileInputSelected.size
        })

        inputComponent.value = null
    }

    const onSubmitFiles = async (event) => {
        if (!fileSelected) {
            return alert('SELECIONE UM ARQUIVO!')
        }

        setUploadingFile(true)
        try{
            const data = new FormData();
            data.append('file', fileSelected.data);
    
            const result = await axios.post('http://localhost:5000/invoice/upload', data)

            alert(`Fatura Nº${result.data.numberInvoice} importada com sucesso.`)
            setFileSelect(null)
        }catch(e){
            alert("Ocorreu um erro: " + e.message)
        }finally{
            setUploadingFile(false)
        }
    }


    return (
        <div className="container-upload-invoice">
            <div className="content-upload-invoice">
                <h1>IMPORTAR NOVA FATURA</h1>
                <input
                    type="file"
                    id="invoice-file"
                    onChange={onChangeFiles}
                    placeholder="Selecione um ou varios arquivos"
                    accept="application/pdf"
                />
                <div className="footer-upload-invoice">
                    <ButtonAction
                        onClick={onSubmitFiles}
                        type='sucess'
                        label='IMPORTAR'
                    />
                </div>
            </div>
            {
                uploadingFile && <LoadingIndicator title={`Importando ${fileSelected.name}`} />
            }
            {
                fileSelected &&
                (
                    <div className='content-preview'>
                        <PreviewPDFComponent srcs={[fileSelected.preview]} />
                    </div>
                )
            }
        </div>
    )
}