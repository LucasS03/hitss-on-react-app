import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from "../services/user";
import "../style/admin.css";

const AdminUsers = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);

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

	const deleteUser = (id) => {
		console.log(`Delete user ${id}`);
	}

	const editUser = (id) => {
		console.log(`Edit user ${id}`);
	}

	return (
		<div className="admin-users">
			<h1>Usuários</h1>
			<hr />
			
			<div>
				{users.length && users.map((user) => {
					return (
						<div className='user-item' key={`user-${user.id}`}>
							<span>{user.first_name} {user.last_name}</span>
							<div>
								<span className='action' onClick={() => editUser(user.id)}>E</span>
								<span className='action' onClick={() => deleteUser(user.id)}>X</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default AdminUsers;