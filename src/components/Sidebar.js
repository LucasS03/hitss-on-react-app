import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/sidebar.css";

function Sidebar(props) {
	let navigate = useNavigate();

	return (
		<div className="sidebar">
			<ul>
				<li onClick={() => navigate("/admin/cursos")} className={props.page === "cursos" ? "selected" : ""}>Cursos</li>
				<li onClick={() => navigate("/admin/usuarios")} className={props.page === "usuarios" ? "selected" : ""}>Usuários</li>
			</ul>
		</div>
	);
}

export default Sidebar;