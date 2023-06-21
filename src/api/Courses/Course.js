import { del, get, post, put } from "../Config";


export const getTopThreeCourses = async () => {
  const url = `top/trhee/courses`;
  return await get(url);
};

export const getCourses = async () => {
  const url = `/courses`;
  return await get(url);
};

export const getCourseById = async (id) => {
  const url = `/course/${id}`;
  return await get(url);
};


export const createCourse = async (courseData) => {
  const url = '/course';
  return await post(url, courseData);
};

export const updateCourse = async (courseId, courseData) => {
  const url = `/course/${courseId}`;
  return await post(url, courseData);
};

export const deleteCourse = async (id) => {
  const url = `/course/${id}`;
  return await del(url);
};

export const getStudentsCourses = async () => {
  const url = `/students/courses`;
  return await get(url);
}

export const enrollStudentToCourse = async (courseId,studentId) => {
  const url = `/course/${courseId}/student/${studentId}`;
  return await post(url);
}

export const unenrollStudentFromCourse = async (courseId,studentId) => {
  const url = `/student/${studentId}/course/${courseId}`;
  return await del(url);
}

