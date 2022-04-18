import fileDownload from 'js-file-download';
import api from './api';

const saveCourse = async (course) => {
	try {
		return api.post('/course', course);
	} catch (error) {
		console.error("save course error: ", error);
		return error;
	}
}

const updateCourse = async (id, course) => {
	try {
		return api.put(`/course/${id}`, course);
	} catch (error) {
		console.error("update course error: ", error);
		return error;
	}
}

const deleteCourseById = async (id) => {
	try {
		return api.delete(`/course/${id}`);
	} catch (error) {
		console.error("delete course error: ", error);
		return error;
	}
}

const getCourses = async () => {
  try {
		const resp = await api.get(`/courses`);

		return resp.data;
	} catch (error) {
		console.error("get courses error: ", error);
		return error;
	}
}

const getCourseById = async (id) => {
  try {
		const resp = await api.get(`/course/${id}`);
		
		return resp.data;
	} catch (error) {
		console.error("get course error: ", error);
		return error;
	}
}

const getClassesByCourseId = async (id) => {
		try {
			return api.get(`/course/${id}/classes`);
		} catch (error) {
			console.error("get course error: ", error);
			return error;
		}
}

const getCertificate = async (courseId, userId) => {
	try {
		return await api.get(`/courses/${courseId}/certificate/${userId}`, { responseType: 'blob' })
			.then(resp => {
				fileDownload(resp.data, 'certificado.pdf')
			})
	} catch (error) {
		console.error("get certificate error: ", error);
		return error;
	}
}

const methods = { 
    saveCourse,
    updateCourse,
    deleteCourseById,
    getCourses,
    getCourseById,
    getClassesByCourseId,
	getCertificate
};

export default methods;