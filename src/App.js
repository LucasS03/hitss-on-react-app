import React, { useState } from "react";
import './App.css';
import Modal from './modal';
import ModalBody from './modalBody';
import { MainContext } from './contexts/MainContext'

function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userInfo, setUserInfo } = React.useContext(MainContext);

  function changeStateModal(state) {
    setModalIsOpen(state);
  }

  return (
    <div className="App">
      <header className="App-header">
        {JSON.stringify(userInfo)} <br />
        
        {modalIsOpen ?
          <Modal title="Login" onCloseModal={(value) => changeStateModal(value)}>
            <ModalBody />
          </Modal>
          :
          userInfo ?
            <button className="btn-login" onClick={() => setUserInfo(null)}>
              Logout
            </button>
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
