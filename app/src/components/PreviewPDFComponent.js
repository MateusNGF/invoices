
export default function PreviewPDFComponent({
    srcs = []
}){

    return (
        <div className="conteinar-preview">
            {srcs.map((src, index) => {
                console.log(src)
                return <embed className="preview-embed" src={src} type="application/pdf"/>
            })}
        </div>
    )
}