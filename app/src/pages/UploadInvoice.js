import './css/UploadInvoice.css'
import { useState } from 'react'
import axios from 'axios'

import ButtonAction from '../components/ButtonComponent'
import PreviewPDFComponent from '../components/PreviewPDFComponent';

export default function UploadInvoice() {
    const [fileSelected, setFileSelect] = useState(null);

    const onChangeFiles = (event) => {
        const fileInputSelected  = document.getElementById('invoice-file').files[0]

        if (!fileInputSelected) return;

        setFileSelect({
            data : fileInputSelected,
            preview: URL.createObjectURL(fileInputSelected),
            name: fileInputSelected.name,
            size: fileInputSelected.size
        })

    }

    const onSubmitFiles = async (event) => {
        try{
            const data = new FormData();
            data.append('file', fileSelected.data);
    
            await axios.post('http://localhost:5000/invoice/upload', data, {
                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log('progressEvent', progress)
                }
            })

        }catch(e){
            console.error(e)
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
            <div className='content-preview'>
                {
                    fileSelected && 
                    (<PreviewPDFComponent srcs={[fileSelected.preview]}/>)
                }
            </div>
        </div>
    )
}