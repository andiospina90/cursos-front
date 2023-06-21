import { Alert, Box, Button, FormHelperText, FormLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCourse, enrollStudentToCourse, getCourses, getStudentsCourses, unenrollStudentFromCourse } from '../../api/Courses/Course';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from 'react-select'
import { getStudents } from '../../api/Students/Student';

const ListaCursosEstudiantes = () => {

  const [studentsCourses, setStudentsCourses] = useState([]);
  const [studentData, setstudentData] = useState([]);
  const [coursesData, setcoursesData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [errorSelectCourse, setErrorSelectCourse] = useState(false);
  const [errorSelectStudent, setErrorSelectStudent] = useState(false);
  const [alertShow, setalertShow] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const [alertType, setalertType] = useState("success");

  useEffect(() => {
    fetchStudentsCourses();
    fetchSelectData();
  }, []);

  const fetchSelectData = async () => {
    try {
      const coursesData = await getCourses();

      let cousesSelect = coursesData.map((course) => {
        return {
          value: course.id,
          label: course.course_name
        }
      });
      setcoursesData(cousesSelect);

      const studentData = await getStudents();
      let studentSelect = studentData.map((student) => {
        return {
          value: student.id,
          label: student.name + " " + student.last_name
        }
      });
      setstudentData(studentSelect);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchStudentsCourses = async () => {
    try {
      const studentsCoursesData = await getStudentsCourses();
      setStudentsCourses(studentsCoursesData.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  }

  const handleStudentCourseEnrollment = async () => {
    try {

      const courseId = selectedCourse === null ? null : selectedCourse.value;
      const studentId = selectedStudent === null ? null : selectedStudent.value;

      if(courseId === null){
        setErrorSelectCourse(true);
        return;
      }

      if(studentId === null){
        setErrorSelectStudent(true);
        return;
      }

      setErrorSelectCourse(false);
      setErrorSelectStudent(false);

      const response = await enrollStudentToCourse(courseId, studentId);

      if(response.status === 'success'){
        setalertShow(true);
        setalertMessage(response.message);
        setalertType("success");
        fetchStudentsCourses();
        setSelectedCourse(null);
        setSelectedStudent(null);
        setErrorSelectCourse(false);
        setErrorSelectStudent(false);
      }

      if(response.status === 'failed'){
        setalertShow(true);
        setalertMessage(response.message);
        setalertType("error");
      }

      setTimeout(() => {
        setalertMessage("");
        setalertShow(false);
        setalertType("success");
      }
      , 3000);

    } catch (error) {
      console.log(error);
    }
  }

  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption);
  };

  const handleStudentChange = (selectedOption) => {
    setSelectedStudent(selectedOption);
  };

  const handleDeleteStudentCourse = async (id) => {
    try {
      await unenrollStudentFromCourse(id);
      fetchStudentsCourses();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div style={{ padding: '1rem' }}>
      <h1> Cursos</h1>

      <h3>Agregar Estudiante a curso</h3>
      <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '1rem', marginBottom: '1rem' }}>

        <Box sx={{ paddingBottom: '1rem !important' }}>
          <FormLabel component="label" sx={{ fontWeight: 'bold', color: 'black' }}>Lista de curso</FormLabel>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={coursesData}
            placeholder="Seleccione un curso"
            name="course_name"
            value={selectedCourse}
            isClearable={true}
            isSearchable={true}
            onChange={handleCourseChange}
          />
          {errorSelectCourse && <FormHelperText sx={{ color: 'red' }}>Seleccione un curso</FormHelperText>}
        </Box>
        <Box sx={{ paddingBottom: '0.5rem !important' }}>
          <FormLabel component="label" sx={{ fontWeight: 'bold', color: 'black' }}>Lista de estudiantes</FormLabel>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={studentData}
            placeholder="Seleccione un estudiante"
            name="student_name"
            value={selectedStudent}
            isClearable={true}
            isSearchable={true}
            onChange={handleStudentChange}
          />
          {errorSelectStudent && <FormHelperText sx={{ color: 'red' }}>Seleccione un estudiante</FormHelperText>}
        </Box>
        <Button variant="contained" color="primary" onClick={() => { handleStudentCourseEnrollment() }} endIcon={<AddCircleIcon />}>
          Asociar a curso
        </Button>
        {alertShow && <Alert severity={alertType} sx={{marginTop:'10px'}}>{alertMessage}</Alert>}
      </div>
      <div>
        <h3>Lista de estudiantes matriculados</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>Nombre Estudiante</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Fecha Inicio</TableCell>
                <TableCell>Fecha Fin</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsCourses.map((studentCourse, index) => (
                <TableRow key={index}>
                  <TableCell>{studentCourse.name} {studentCourse.last_name}</TableCell>
                  <TableCell>{studentCourse.course_name}</TableCell>
                  <TableCell>{studentCourse.course_start_date}</TableCell>
                  <TableCell>{studentCourse.course_end_date}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDeleteCourse(studentCourse.student_id,studentCourse.course_id)} endIcon={<DeleteIcon />}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default ListaCursosEstudiantes