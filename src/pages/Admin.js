import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import "../style/admin.css";
import AdminCourses from './AdminCourses';
import AdminUsers from './AdminUsers';

const Admin = () => {
    const params = useParams();

    return (
        <div className="admin">
            <div className="admin-sidebar">
                <Sidebar page={params.page}/>
            </div>

            <div className="admin-content">
                {params.page === "cursos" ? 
                    <AdminCourses /> :
                    params.page === "usuarios" ?
                    <AdminUsers /> :
                    <h1>Não encontrado...</h1>
                }
            </div>
        </div>
    );
}

export default Admin;