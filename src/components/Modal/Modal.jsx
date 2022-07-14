import "./Modal.css"
import Overlay from "../Overlay/Overlay"

function Modal (props){
    const handleClick = (e, canClose) => {
        e.stopPropagation()
        if(canClose) props.closeModal()
    }
    return(
        <Overlay overlayClick={props.closeModal}>
            <div className="Modal" onClick={handleClick}>
                <span className="Modal-close" onClick={(e) => handleClick(e, true)}>+</span>
                <div className="Modal-body">{props.children}</div>
            </div>
      </Overlay>
    )
}

export default Modal;