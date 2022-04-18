import api from './api';

const saveLesson = async (lesson) => {
	try {
		return api.post('/class', lesson);
	} catch (error) {
		console.error("save lesson error: ", error);
		return error;
	}
}

const updateLesson = async (id, lesson) => {
	try {
		return api.put(`/class/${id}`, lesson);
	} catch (error) {
		console.error("update lesson error: ", error);
		return error;
	}
}

const deleteLessonById = async (id) => {
	try {
		return api.delete(`/class/${id}`);
	} catch (error) {
		console.error("delete lesson error: ", error);
		return error;
	}
}

const getLessonsByClassId = async (courseId) => {
	try {
		  const resp = await api.get(`course/${courseId}/classes`);

			return resp.data || [];
		} catch (error) {
		  console.error("get lessons error: ", error);
		  return error;
	  }
  }

const getLessonById = async (id) => {
  try {
		return api.get(`/class/${id}`);
	} catch (error) {
		console.error("get lesson error: ", error);
		return error;
	}
}

const methods = { 
    saveLesson,
    updateLesson,
    deleteLessonById,
	getLessonsByClassId,
    getLessonById
};

export default methods;