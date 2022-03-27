import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";
import { MainContext } from "../contexts/MainContext";
import coursesApi from "../services/courses";

function Home() {
    const { userInfo } = React.useContext(MainContext);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if(!userData || !userData.user) {
            navigate("/");
        }

        const getCourses = async () => {
            setCourses(await coursesApi.getCourses());
        }

        getCourses();
    }, [userInfo, navigate]);



    return (
        <div className="container-home">
            {/* Teste Home {params.id} <br /> */}
            <h1>Cursos</h1>

            {courses.length && courses.map((course) => {
                return <div className="course" key={course.id}>
                    <h2>{course.title}</h2>
                    <h4>{course.description}</h4>
                </div>
            })}
        </div>
    );
}

export default Home;