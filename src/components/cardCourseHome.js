import React from "react";
import { Link } from "react-router-dom";

const CardCourseHome = (props) => {

    return (
        <Link to={`/curso/${props.course.id}/aulas`}>
            <div className="course" key={props.course.id}>
                <h2>{props.course.title}</h2>
                <h4>{props.course.description}</h4>
            </div>
        </Link>
    );
}

export default CardCourseHome;