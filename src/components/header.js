import React, { useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Link, useNavigate } from "react-router-dom";
import "../style/header.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from "./modal";
import ModalBody from "./modalBody";
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
		setModalIsOpen(true);
	}
	
	return (
		<div className="header">
			{modalIsOpen ?
				<div className='login-container-modal'>
					<div className='login-content-modal'> 
						<Modal title="Login" onCloseModal={(value) => changeStateModal(value)}>
							<ModalBody onCloseModal={(value) => changeStateModal(value)} />
						</Modal>
					</div>
				</div>
				: <></>
			}

			<div className="header-content">
				<h1>HitssOn</h1>

				<div>
					<div className="dropdown">
						<button className="dropbtn">Perfil</button>
						<div className="dropdown-content">
							<Link to="/">Modo Aluno</Link>
							<Link to="/admin/cursos">Modo Admin</Link>
						</div>
					</div>
					<button className="header-logout" onClick={() => userInfo ? logout() : login()}>
						{ userInfo ? 'Sair' : 'Login' }
					</button>
				</div>
			</div>

		</div>
	);
}

export default Header;