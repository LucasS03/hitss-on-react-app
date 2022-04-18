import React, { useState } from "react";
import user from "../services/user";
import { useNavigate } from "react-router-dom";

const ModalBody = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleLogin() {
        user.login({ email, password })
        .then(function (response) {
            setLoginError(false);
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate(`/inicio`);
            props.onCloseModal(false);
        })
        .catch(function (error) {
            console.error(error);
            setLoginError(true);
        });
    }

    function onKeyUp(key) {
        if(key.code === "Enter")
            handleLogin();
    }

    return <div>
        <form className="form-modal">
            <input 
                className="input input-login"
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={handleEmailChange} />
            
            <input
                className="input input-password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={handlePasswordChange}
                onKeyUp={onKeyUp}/>

            <button className="btn-submit" type="button" onClick={handleLogin}>Login</button>

            { loginError ? 
                <div className="login-error">
                    <p>Erro ao fazer login.</p>
                </div> :
                <></>
            }
        </form>
    </div>
}

export default ModalBody;