import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/home.css";
import { MainContext } from "../contexts/MainContext";

function Home() {
    const params = useParams();
    const { userInfo } = React.useContext(MainContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if(!userData || !userData.user) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    return (
        <div className="container-home">
            Teste Home {params.id} <br />
            {JSON.stringify(userInfo)}
        </div>
    );
}

export default Home;