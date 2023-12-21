import './css/BtnComponent.css';

export default function ButtonAction({ type, onClick, label, size }) {
    return (
        <button
            className={`btn-component btn-type-${type} btn-size-${size}`}
            onClick={onClick}
        >{label}
        </button>
    )
}

