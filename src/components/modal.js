import React from "react";

const Modal = (props) => {
    
    function closeModal() {
        props.onCloseModal(false)
    }

    return <div className="container-modal">
        <div className="modal">
            <div className="btn-close-content">
                <button className="btn-close" onClick={closeModal}>x</button>
            </div>
            <h1 className="title">{props.title}</h1>
            {props.children}
        </div>
    </div>
}

export default Modal;