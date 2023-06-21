import { del, get, post, put } from "../Config";

export const getStudents = async () => {
    const url = `/students`;
    return await get(url);
};

export const getStudentById = async (userId) => {
  const url = `/student/${userId}`;
  return await get(url);
};

export const createStudent = async (studentData) => {
  const url = '/student';
  return await post(url, studentData);
};

export const updateStudent = async (userId, studentData) => {
  const url = `/student/${userId}`;
  return await put(url, studentData);
};

export const deleteStudent = async (userId) => {
  const url = `/student/${userId}`;
  return await del(url);
};