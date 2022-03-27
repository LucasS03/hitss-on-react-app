import React, { useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { useNavigate } from "react-router-dom";
import "../style/header.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from "../modal";
import ModalBody from "../modalBody";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

// const element = <FontAwesomeIcon icon={faCoffee} />

// ReactDOM.render(element, document.body)

function Header() {
	const { userInfo, setUserInfo } = React.useContext(MainContext);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	let navigate = useNavigate();

  function changeStateModal(state) {
    setModalIsOpen(state);
  }

	function logout() {
		setUserInfo(null);
		navigate("/");
	}

	function login() {
		console.log("login");
		setModalIsOpen(true);
	}
	
	return (
		<div className="header">
			{modalIsOpen ? 
				<Modal title="Login" onCloseModal={(value) => changeStateModal(value)}>
					<ModalBody onCloseModal={(value) => changeStateModal(value)} />
				</Modal>
				: <></>
			}

			<div className="header-content">
				<h1>HitssOn</h1>
				<button className="header-logout" onClick={() => userInfo ? logout() : login()}>
					{ userInfo ? 'Sair' : 'Login' }
				</button>
			</div>

		</div>
	);
}

export default Header;