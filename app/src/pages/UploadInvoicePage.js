import { useState } from 'react'
import './css/UploadInvoicePage.css'

import ButtonAction from '../components/ButtonComponent'
import LoadingIndicator from '../components/LoadComponent'
import PreviewPDFComponent from '../components/PreviewPDFComponent'
import Api from '../utils/Api'

export default function UploadInvoice() {
    const [filesSelected, setFilesSelect] = useState([]);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [currentFileUpload, setCurrentFileUpload] = useState(null);
    const [progress, setProgress] = useState(0);
    
    const onChangeFiles = (event) => {
        const inputComponent =  document.getElementById('invoice-file')
        const filesInputSelected  = inputComponent.files
        
        if (!filesInputSelected || !filesInputSelected.length) return;

        setFilesSelect(
            Array.from(filesInputSelected).map(
                (file => ({
                    data: file,
                    preview: URL.createObjectURL(file),
                    name: file.name,
                    size: file.size
                }))
            )
        )

        inputComponent.value = null
    }

    const onSubmitFiles = async (event) => {
        
        if (!filesSelected.length) {
            return alert('SELECIONE PELO MENOS UM ARQUIVO!')
        }
        
        const uploaded = []
        for (const file of filesSelected) {
            setCurrentFileUpload(file)
            setUploadingFile(true)
            try{
                const data = new FormData();
                data.append('file', file.data);
        
                const result = await Api.uploadInvoice(data, {
                    onProgress: setProgress
                })
    
                uploaded.push(`${uploaded.length + 1}º - Fatura Nº${result.numberInvoice} importada com sucesso.`)
                setCurrentFileUpload(null)
            }catch(e){
                uploaded.push(`${uploaded.length + 1}º - Falha ao importar a fatura.`)
                alert("Ocorreu um erro: " + e.message)
            }finally{
                setUploadingFile(false)
            }
        }

        alert(uploaded.join('\n'))
        setFilesSelect(null)
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
                    multiple
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
                uploadingFile && <LoadingIndicator title={`Importando ${currentFileUpload.name} - ${progress}%`} />
            }
            {
                filesSelected &&
                (
                    <div className='content-preview'>
                        <PreviewPDFComponent content={filesSelected.map(file => ({
                            name: file.name,
                            src: file.preview
                        }))} />
                    </div>
                )
            }
        </div>
    )
}