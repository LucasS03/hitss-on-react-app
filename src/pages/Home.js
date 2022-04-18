import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";
import { MainContext } from "../contexts/MainContext";
import coursesApi from "../services/courses";
import CardCourseHome from "../components/cardCourseHome";

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
            <h1>Trilha Javascript</h1>

            {courses.length && courses.map((course) => {
                return <CardCourseHome course={course} key={`home-course-${course.id}`}/>
            })}
        </div>
    );
}

export default Home;