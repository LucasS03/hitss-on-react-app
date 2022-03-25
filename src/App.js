import React, { useState } from "react";
import './App.css';
import Modal from './modal';
import ModalBody from './modalBody';

function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function changeStateModal(state) {
    setModalIsOpen(state);
  }

  return (
    <div className="App">
      <header className="App-header">
        {modalIsOpen ?
          <Modal title="Login" onCloseModal={(value) => changeStateModal(value)}>
            <ModalBody />
          </Modal>
          : 
          <button className="btn-login" onClick={() => changeStateModal(true)}>
            Fazer Login
          </button>
        }
        
      </header>
    </div>
  );
}

export default App;
