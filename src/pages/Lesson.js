import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/lesson.css";
import lessonsApi from "../services/lessons";
import coursesApi from "../services/courses";
import CardLessonCourse from "../components/cardLessonCourse";
import VideoPlayer from "../components/VideoPlayer";

const Lesson = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [lesson, setLesson] = useState({});
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if(!userData || !userData.user) {
            navigate("/");
        }

        const getCourse = async () => {
            const data = await coursesApi.getCourseById(params.courseId);
            setCourse(data)
        }
        const getLesson = async () => {
            const data = await lessonsApi.getLessonById(params.lessonId);
            setLesson(data.data);
        }

        getLesson();
        getCourse();
    }, [navigate, params]);



    return (
        <div className="container-lesson">
            <Link to={-1}>
                <span>Voltar</span>
            </Link>

            <h1>{lesson.title}</h1>

            <div className="content-lesson">
                <div className="list-lessons">
                    {course.title}

                    <VideoPlayer></VideoPlayer>

                </div>
                <div className="description-course">
                    <div className="description-course-content">
                        <h2>Sobre a aula</h2>
                        <p>{lesson.description}</p>
                    </div>
                    <hr className="divider-section"/>
                </div>
            </div>
        </div>
    );
}

export default Lesson;