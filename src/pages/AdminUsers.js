import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from "../services/user";
import "../style/admin.css";

import Modal from "./../components/modal";

const AdminUsers = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
	const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

	const [user, setUser] = useState({});
	const [username, setUsername] = useState('');
	const [lastname, setLastname] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [userCPF, setUserCPF] = useState('');
	const [userPassword, setUserPassword] = useState('');

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("user"));
		if(!userData || !userData.user) {
			navigate("/");
		}

		const getUsers = async () => {
			setUsers(await usersApi.getUsers());
		}

		getUsers();
	}, [navigate]);

	function changeStateModal(state) {
		setModalIsOpen(state);
	}

	function changeStateModalEdit(state) {
		setModalEditIsOpen(state);
	}

	function changeStateModalDelete(state) {
		setModalDeleteIsOpen(state);
	}

	const openDeleteUser = (data) => {
		setUser(data);
		setUsername(data.first_name);
		setLastname(data.last_name);
		changeStateModalDelete(true);
	}
	const deleteUser = () => {
		usersApi.deleteUserById(user.id)
			.then((resp) => {
				resetUserData();
				changeStateModalDelete(false);

				let newListUsers = users.filter(c => c.id !== user.id)
				setUsers(newListUsers);
			}).catch((error) => {
				console.error(error);
			})
	}

	const openEditUser = (data) => {
		setUser(data);
		setUsername(data.first_name);
		setLastname(data.last_name);
		setUserEmail(data.email);
		setUserPhone(data.phone);
		setUserCPF(data.cpf);
		setUserPassword("");
		changeStateModalEdit(true);
	}
	const editUser = () => {
		if(username && lastname && userEmail && userPhone)
			usersApi.updateUser(user.id, {
				"first_name": username,
				"last_name": lastname,
				"email": userEmail,
				"phone": userPhone
			}).then((resp) => {
				changeStateModalEdit(false);
				const index = users.findIndex(e => e.id === user.id);
				let newListUsers = [ ...users ];
				newListUsers[index] = resp.data;
				setUsers(newListUsers);
				resetUserData();
			}).catch((error) => {
				console.error("Erro ao editar!");
			})
	}

	function createUser() {
		if(username && lastname && userEmail && userPhone && userCPF && userPassword)
			usersApi.saveUser({
					"first_name": username,
					"last_name": lastname,
					"email": userEmail,
					"cpf": userCPF,
					"phone": userPhone,
					"password": userPassword
				})
				.then((resp) => {
					users.push(resp.data);
					changeStateModal(false);
					resetUserData();
				}).catch((error) => {
					console.error(error);
				});
	}

	const resetUserData = () => {
		setUsername("");
		setLastname("");
		setUserEmail("");
		setUserPhone("");
		setUserCPF("");
		setUserPassword("");
	}

	function handleUsernameChange(e) {
		setUsername(e.target.value);
	}
	function handleLastnameChange(e) {
		setLastname(e.target.value);
	}
	function handleUserEmailChange(e) {
		setUserEmail(e.target.value);
	}
	function handleUserPhoneChange(e) {
		setUserPhone(e.target.value);
	}
	function handleUserCPFChange(e) {
		setUserCPF(e.target.value);
	}
	function handleUserPasswordChange(e) {
		setUserPassword(e.target.value);
	}

	return (
		<div className="admin-users">
			<div className='admin-users-header'>
				<h1>Usuários</h1>
				<button className='action create' onClick={() => setModalIsOpen(true)}>Criar</button>
			</div>
			<hr />
			
			<div>
				{users.length && users.map((user) => {
					return (
						<div className='user-item' key={`user-${user.id}`}>
							<span>{user.first_name} {user.last_name}</span>
							<div>
								<button className='action update' onClick={() => openEditUser(user)}>Editar</button>
								<button className='action delete' onClick={() => openDeleteUser(user)}>Excluir</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* criar */}
			{modalIsOpen ?
				<div className='create-user-container-modal'>
					<div className='create-user-content-modal'>
						<Modal title="Novo usuário" onCloseModal={(value) => changeStateModal(value)}>
							<div className='modal-content'>
								<input 
									className='input'
									type="text"
									placeholder="Nome"
									value={username}
									onChange={handleUsernameChange}/>

								<input 
									className='input'
									type="text"
									placeholder="Sobrenome"
									value={lastname}
									onChange={handleLastnameChange}/>

								<input 
									className='input'
									type="text"
									placeholder="Email"
									value={userEmail}
									onChange={handleUserEmailChange}/>
									
								<input 
									className='input'
									type="text"
									placeholder="Telefone"
									value={userPhone}
									onChange={handleUserPhoneChange}/>

								<input 
									className='input'
									type="text"
									placeholder="CPF"
									value={userCPF}
									onChange={handleUserCPFChange}/>

								<input 
									className='input'
									type="password"
									placeholder="Senha"
									value={userPassword}
									onChange={handleUserPasswordChange}/>
								
								<button className='btn-submit' onClick={createUser}>Criar Novo Usuário</button>
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}

			{/* editar */}
			{modalEditIsOpen ?
				<div className='create-user-container-modal'>
					<div className='create-user-content-modal'>
						<Modal title="Editar usuário" onCloseModal={(value) => changeStateModalEdit(value)}>
							<div className='modal-content'>
							<input 
									className='input'
									type="text"
									placeholder="Nome"
									value={username}
									onChange={handleUsernameChange}/>

								<input 
									className='input'
									type="text"
									placeholder="Sobrenome"
									value={lastname}
									onChange={handleLastnameChange}/>

								<input 
									className='input'
									type="text"
									placeholder="Email"
									value={userEmail}
									onChange={handleUserEmailChange}/>
									
								<input 
									className='input'
									type="text"
									placeholder="Telefone"
									value={userPhone}
									onChange={handleUserPhoneChange}/>

								<input 
									className='input'
									type="text"
									placeholder="CPF"
									disabled="disabled"
									value={userCPF}
									onChange={handleUserCPFChange}/>
								
								<button className='btn-submit' onClick={editUser}>Editar este Usuário</button>
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}

			{/* deletar */}
			{modalDeleteIsOpen ?
				<div className='create-user-container-modal'>
					<div className='create-user-content-modal'>
						<Modal title="Excluir usuário" onCloseModal={(value) => changeStateModalDelete(value)}>
							<div className='modal-content'>
								<p>Deseja mesmo excluir o usuário <b>{username} {lastname}</b>?</p>
								<div className='delete-options'>
									<button className='action' onClick={() => changeStateModalDelete(false)}>Não</button>
									<button className='action delete' onClick={() => deleteUser()}>Sim</button>
								</div>
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}
		</div>
	);
}

export default AdminUsers;