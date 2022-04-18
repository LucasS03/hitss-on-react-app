import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";
import './../App.css';

function Login() {

	const { userInfo } = React.useContext(MainContext);
	const navigate = useNavigate();

	useEffect(() => {
		if(userInfo)
			navigate("/inicio");		
	}, [userInfo, navigate]);

	return (
		<div className="App">
			<header className="App-header">
				login {JSON.stringify(userInfo)}
			</header>
		</div>
	);
}

export default Login;