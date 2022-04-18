import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coursesApi from "../services/courses";
import lessonsApi from "../services/lessons";
import "../style/admin.css";

import Modal from "../components/modal";

const AdminLessons = () => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);
	const [lessons, setLessons] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalLessonsIsOpen, setModalLessonsIsOpen] = useState(false);
	const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
	const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

	const [lessonCreated, setLessonCreated] = useState(false);
	const [lessonCreatedData, setLessonCreatedData] = useState({});

	const [lesson, setLesson] = useState({});
	const [lessonTitle, setLessonTitle] = useState('');
	const [lessonDescription, setLessonDescription] = useState('');
	const [lessonCourse, setLessonCourse] = useState({});
	const [lessonNumber, setLessonNumber] = useState(0);
	const [videoFile, setFile] = useState(null);

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

	function changeStateModalLessons(state, course) {
		setLessonCourse(course || {});
		setModalLessonsIsOpen(state);
	}

	function changeStateModalEdit(state) {
		setModalEditIsOpen(state);
	}

	function changeStateModalDelete(state) {
		setModalDeleteIsOpen(state);
	}

	const openDeleteLesson = (data) => {
		setLesson(data);
		setLessonTitle(data.title);
		changeStateModalDelete(true);
	}

	const deleteLesson = () => {
		lessonsApi.deleteLessonById(lesson.id)
			.then((resp) => {
				resetLessonData();
				changeStateModalDelete(false);

				let newList = lessons.filter(c => c.id !== lesson.id)
				setLessons(newList);
			}).catch((error) => {
				console.error(error);
			})
	}

	const openEditLesson = (data) => {
		setLesson(data);
		setLessonTitle(data.title);
		setLessonDescription(data.description);
		setLessonNumber(data.number);
		changeStateModalEdit(true);
	}

	const editLesson = () => {
		if(lessonTitle && lessonDescription && lessonNumber) {
			lessonsApi.updateLesson(lesson.id, {
				"title": lessonTitle,
				"description": lessonDescription,
				"number": lessonNumber
			}).then((resp) => {
				changeStateModalEdit(false);
				const index = lessons.findIndex(e => e.id === lesson.id)
				let newList = [ ...lessons ];
				newList[index] = resp.data
				setLessons(newList);
				resetLessonData();
			}).catch((error) => {
				console.error("Erro ao editar!");
			})
		}
	}

	const openCreateLesson = () => {
		changeStateModal(true);
		resetLessonData();
	}

	const createLesson = () => {
		if(lessonTitle && lessonDescription && lessonNumber) {
			lessonsApi.saveLesson({
				"title": lessonTitle,
				"description": lessonDescription,
				"courseId": lessonCourse.id,
				"number": parseInt(lessonNumber)
			}).then((resp) => {
				let newList = [];
				
				if(lessons.length)
					newList = [...lessons, resp.data];
				else 
					newList = [resp.data];

				setLessons(newList);
				setLessonCreatedData(resp.data);
				setLessonCreated(true);
			}).catch((error) => {
				console.error(error);
			})
		}
	}

	const saveVideo = (e) => {
		if(!videoFile) {
			alert("Nenhum vídeo selecionado.");
			return;
		}

		if(lessonCreatedData && lessonCreatedData.id && videoFile) {
			e.preventDefault();
			lessonsApi.uploadVideo(videoFile, lessonCreatedData.id)
				.then((resp) => {
					console.log(resp);
					changeStateModal(false);
				}).catch((error) => {
					console.error(error);
				})
		}
	}

	const resetLessonData = () => {
		setLessonTitle("");
		setLessonDescription("");
		setLessonNumber("");
	}

	const openLessonsOfCourse = (course) => {
		lessonsApi.getLessonsByClassId(course.id)
			.then((resp) => {
				setLessons(resp);
				changeStateModalLessons(true, course);
			}).catch((error) => {
				console.error(error);
			})
	};

	function handleTitleChange(e) {
		setLessonTitle(e.target.value);
	}

	function handleDescriptionChange(e) {
		setLessonDescription(e.target.value);
	}

	function handleNumberChange(e) {
		setLessonNumber(e.target.value);
	}

	return (
		<div className="admin-lessons">
			<div className='admin-lessons-header'>
				<h1>Aulas</h1>
			</div>
			<hr />
			
			<div>
				{courses.length && courses.map((course) => {
					return (
						<div className='course-item' key={`course-${course.id}`}>
							<span>{course.title}</span>
							<div>
								<button className='action' onClick={() => openLessonsOfCourse(course)}>+</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* aulas */}
			{modalLessonsIsOpen ?
				<div className='create-lesson-container-modal'>
					<div className='create-lesson-content-modal'>
						<Modal title="Aulas" onCloseModal={(value) => changeStateModalLessons(value)}>
							<div className='modal-content'>
								<button className='action create margin-0 mb-10' onClick={() => openCreateLesson()}>Criar nova aula</button>
								{ lessons.length ? 
									lessons.map((e) => {
										return (
											<div className='lesson-item' key={`lesson-${e.id}`}>
												{e.title}
												<div>
													<button className='action update' onClick={() => openEditLesson(e)}>Editar</button>
													<button className='action delete' onClick={() => openDeleteLesson(e)}>Excluir</button>
												</div>
											</div>
										)
									}) :
									<p>Sem aulas cadastradas para este curso.</p>
								}
							</div>
						</Modal>
					</div>
				</div> :
				<></>
			}

			{/* criar */}
			{modalIsOpen ?
				<div className='create-lesson-container-modal'>
					<div className='create-lesson-content-modal'>
						<Modal title="Nova Aula" onCloseModal={(value) => changeStateModal(value)}>
							<div className='modal-content'>
								<input disabled={lessonCreated ? 'disabled' : ''}
									className='input'
									type="text"
									placeholder="Título"
									value={lessonTitle}
									onChange={handleTitleChange}/>
								
								<textarea disabled={lessonCreated ? 'disabled' : ''}
									className='input textarea'
									placeholder='Descrição'
									value={lessonDescription}
									onChange={handleDescriptionChange}/>

								<input disabled="disabled"
									className='input'
									type="text"
									value={lessonCourse.title}/>

								<input disabled={lessonCreated ? 'disabled' : ''}
									className='input'
									type="number"
									placeholder="Número"
									value={lessonNumber}
									onChange={handleNumberChange}/>

								{lessonCreated ?
									<input id="file" type="file" onChange={(event) => setFile(event.target.files[0])} /> :
									<></>
								}
								
								{lessonCreated ?
									<button className='btn-submit' onClick={(e) => saveVideo(e)}>Enviar Vídeo</button> :
									<button className='btn-submit' onClick={createLesson}>Criar Nova Aula</button>
								}
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}

			{/* editar */}
			{modalEditIsOpen ?
				<div className='create-lesson-container-modal'>
					<div className='create-lesson-content-modal'>
						<Modal title="Editar Aula" onCloseModal={(value) => changeStateModalEdit(value)}>
							<div className='modal-content'>
								<input 
									className='input'
									type="text"
									placeholder="Título"
									value={lessonTitle}
									onChange={handleTitleChange}/>
								
								<textarea
									className='input textarea'
									placeholder='Descrição'
									value={lessonDescription}
									onChange={handleDescriptionChange}/>

								<input disabled="disabled"
									className='input'
									type="text"
									value={lessonCourse.title}/>

								<input 
									className='input'
									type="number"
									placeholder="Número"
									value={lessonNumber}
									onChange={handleNumberChange}/>
								
								<button className='btn-submit' onClick={editLesson}>Editar Curso</button>
							</div>
						</Modal>
					</div>
				</div>
				: <></>
			}

			{/* deletar */}
			{modalDeleteIsOpen ?
				<div className='create-lesson-container-modal'>
					<div className='create-lesson-content-modal'>
						<Modal title="Excluir aula" onCloseModal={(value) => changeStateModalDelete(value)}>
							<div className='modal-content'>
								<p>Deseja mesmo excluir a aula <b>{lessonTitle}</b>?</p>
								<div className='delete-options'>
									<button className='action' onClick={() => changeStateModalDelete(false)}>Não</button>
									<button className='action delete' onClick={() => deleteLesson()}>Sim</button>
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

export default AdminLessons;