import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/lesson.css";
import lessonsApi from "../services/lessons";
import coursesApi from "../services/courses";
import CardLessonCourse from "../components/cardLessonCourse";

const Lesson = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if(!userData || !userData.user) {
            navigate("/");
        }

        const getCourseById = async () => {
            setCourse(await coursesApi.getCourseById(params.courseId));
        }

        const getLessons = async () => {
            setLessons(await lessonsApi.getLessonsByClassId(params.courseId));
        }

        getLessons();
        getCourseById();
    }, [navigate, params]);



    return (
        <div className="container-lesson">
            <Link to={-1}>
                <span>Voltar</span>
            </Link>

            <h1>{course.title}</h1>
            {lessons.length ? 
                <h4>{lessons.length} aulas</h4> :
                <h4>Sem aulas cadastradas</h4>
            }

            <div className="content-lesson">
                <div className="list-lessons">
                    {lessons.length && lessons.map((lesson) => {
                        return <CardLessonCourse lesson={lesson}/>
                    })}
                </div>
                <div className="description-course">
                    <div className="description-course-content">
                        <h2>Sobre o curso</h2>
                        <p>{course.description}</p>
                    </div>
                    <hr className="divider-section"/>
                </div>
            </div>
        </div>
    );
}

export default Lesson;