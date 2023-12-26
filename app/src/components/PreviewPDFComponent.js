
export default function PreviewPDFComponent({
    srcs = []
}){

    return (
        <div className="conteinar-preview">
            {srcs.map((src, index) => {
                return <embed className="preview-embed" src={src} type="application/pdf" itemScope='true' width='100%' height="100%"/>
            })}
        </div>
    )
}