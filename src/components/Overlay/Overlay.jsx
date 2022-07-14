import "./Overlay.css"

const Overlay = (props) => {
    return (
        <div className="Overlay" onClick={props.overlayClick}>
            {props.children}
        </div>
    )
}

export default Overlay