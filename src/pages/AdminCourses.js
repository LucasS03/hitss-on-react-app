import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coursesApi from "../services/courses";
import "../style/admin.css";

import Modal from "../components/modal";

const AdminCourses = () => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
	const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

	const [course, setCourse] = useState({});
	const [courseName, setCourseName] = useState('');
	const [courseDescription, setCourseDescription] = useState('');

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("user"));
		if(!userData || !userData.user) {
			navigate("/");
		}

		const getCourses = async () => {
			setCourses(await coursesApi.getCourses());
		}

		getCourses();
	}, [navigate]);

	function changeStateModal(state) {
		setModalIsOpen(state);
	}

	function changeStateModalEdit(state) {
		setModalEditIsOpen(state);
	}

	function changeStateModalDelete(state) {
		setModalDeleteIsOpen(state);
	}

	const openDeleteCourse = (data) => {
		setCourse(data);
		setCourseName(data.title);
		changeStateModalDelete(true);
	}

	const deleteCourse = () => {
		coursesApi.deleteCourseById(course.id)
			.then((resp) => {
				setCourseName("");
				setCourseDescription("");
				changeStateModalDelete(false);

				let newListCourse = courses.filter(c => c.id !== course.id)
				setCourses(newListCourse);
			}).catch((error) => {
				console.error(error);
			})
	}

	const openEditCourse = (data) => {
		setCourse(data);
		setCourseName(data.title);
		setCourseDescription(data.description);
		changeStateModalEdit(true);
	}

	const editCourse = () => {
		if(courseName && courseDescription)
			coursesApi.updateCourse(course.id, {
				"title": courseName,
				"description": courseDescription
			}).then((resp) => {
				changeStateModalEdit(false);
				const index = courses.findIndex(e => e.id === course.id)
				let newListCourse = [ ...courses ];
				newListCourse[index] = resp.data
				setCourses(newListCourse);
				setCourseName("");
				setCourseDescription("");
			}).catch((error) => {
				console.error("Erro ao editar!");
			})
	}

	function handleCourseNameChange(e) {
		setCourseName(e.target.value);
	}

	function handleCourseDescriptionChange(e) {
		setCourseDescription(e.target.value);
	}

	function createCourse() {
		if(courseName && courseDescription)
			coursesApi.saveCourse({
					"title": courseName,
					"description": courseDescription
				}).then((resp) => {
					courses.push(resp.data);
					changeStateModal(false);
					setCourseName("");
					setCourseDescription("");
				}).catch((error) => {
					console.error(error);
				});
	}

	return (
		<div className="admin-courses">
			<div className='admin-courses-header'>
				<h1>Cursos</h1>
				<button className='action create' onClick={() => setModalIsOpen(true)}>Criar</button>
			</div>
			<hr />
			
			<div>
				{courses.length && courses.map((course) => {
					return (
						<div className='course-item' key={`course-${course.id}`}>
							<span>{course.title}</span>
							<div>
								<button className='action update' onClick={() => openEditCourse(course)}>Editar</button>
								<button className='action delete' onClick={() => openDeleteCourse(course)}>Excluir</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* criar */}
			{modalIsOpen ?
				<div className='create-course-container-modal'>
					<div className='create-course-content-modal'>
						<Modal title="Novo curso" onCloseModal={(value) => changeStateModal(value)}>
							<div className='modal-content'>
								<input 
									className='input'
									type="text"
									placeholder="Título"
									value={courseName}
									onChange={handleCourseNameChange}/>
								
								<textarea
									className='input textarea'
									placeholder='Descrição'
									value={courseDescription}
									onChange={handleCourseDescriptionChange}/>

								<button className='btn-submit' onClick={createCourse}>Criar Novo Curso</button>
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}

			{/* editar */}
			{modalEditIsOpen ?
				<div className='create-course-container-modal'>
					<div className='create-course-content-modal'>
						<Modal title="Editar curso" onCloseModal={(value) => changeStateModalEdit(value)}>
							<div className='modal-content'>
								<input 
									className='input'
									type="text"
									placeholder="Título"
									value={courseName}
									onChange={handleCourseNameChange}/>
								
								<textarea
									className='input textarea'
									placeholder='Descrição'
									value={courseDescription}
									onChange={handleCourseDescriptionChange}/>

								<button className='btn-submit' onClick={editCourse}>Editar este Curso</button>
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}

			{/* deletar */}
			{modalDeleteIsOpen ?
				<div className='create-course-container-modal'>
					<div className='create-course-content-modal'>
						<Modal title="Excluir curso" onCloseModal={(value) => changeStateModalDelete(value)}>
							<div className='modal-content'>
								<p>Deseja mesmo excluir o curso <b>{courseName}</b>?</p>
								<div className='delete-options'>
									<button className='action' onClick={() => changeStateModalDelete(false)}>Não</button>
									<button className='action delete' onClick={() => deleteCourse()}>Sim</button>
								</div>
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}
		</div>
	);
}

export default AdminCourses;