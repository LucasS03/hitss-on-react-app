import React from "react";
// import { Link } from "react-router-dom";

const CardLessonCourse = (props) => {

    return (
        // <Link to={`/curso/${props.course.id}/lessons/`}>
            <div className="lesson" key={`lesson-${props.lesson.id}`}>
                <h2>{props.lesson.title}</h2>
                <h4>{props.lesson.description}</h4>
            </div>
        // </Link>
    );
}

export default CardLessonCourse;