import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../api/Courses/Course';

const RegistrarCursos = () => {

  let navigate = useNavigate();


  const [course_name, setcourse_name] = useState('');
  const [course_duration, setcourse_duration] = useState('');
  const [course_start_date, setcourse_start_date] = useState('');
  const [course_end_date, setcourse_end_date] = useState('');
  const [alert, setAlert] = useState(false);

  const hangdleSubmit = async (e) => {
      try {
          const courseData = {
              course_name,
              course_duration,
              course_start_date,
              course_end_date
          }
          const createdCourse = await createCourse(courseData);
         
          if (createdCourse.status === 'success') {
              setAlert(true);
              setTimeout(() => {
                  setAlert(false);
                  return navigate("/cursos");
              }, 1000);
          }

      } catch (error) {
          console.log(error);
      }
      e.preventDefault();
  }

  return (
      <div style={{ paddingLeft: '10rem', paddingRight: '10rem' }}>
          <h1>Registrar Curso</h1>
          {alert !== false ? <Alert severity="success" style={{marginBottom:'1rem'}}>Se ha registrado correctamente el curso</Alert> : null}
              <form style={{ display: 'grid' }}>
                  <TextField
                      required
                      id="outlined-required"
                      label="Nombre"
                      defaultValue={course_name}
                      type='text'
                      onChange={(e) => setcourse_name(e.target.value)}
                      sx={{ marginBottom: '1rem' }}
                  />
                  <TextField
                      required
                      id="outlined-required"
                      label="Duracion en dias"
                      defaultValue={course_duration}
                      type='number'
                      onChange={(e) => setcourse_duration(e.target.value)}
                      sx={{ marginBottom: '1rem' }}
                  />
                  <TextField
                      required
                      id="outlined-required"
                      label="Fecha inicio"
                      defaultValue={course_start_date}
                      value={course_start_date}
                      onChange={(e) => setcourse_start_date(e.target.value)}
                      type='date'
                      sx={{ marginBottom: '1rem' }}
                  />
                  <TextField
                      required
                      id="outlined-required"
                      label="Fecha fin"
                      defaultValue={course_end_date}
                      value={course_end_date} s
                      onChange={(e) => setcourse_end_date(e.target.value)}
                      type='date'
                      sx={{ marginBottom: '1rem' }}
                      fullWidth
                  />

                  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                      <Button variant="contained" color="success" onClick={hangdleSubmit}>
                          Guardar
                      </Button>
                      <Button variant="contained" color="primary" onClick={() => {
                          navigate("/cursos");
                      }} sx={{ marginRight: '5px' }}>
                          Regresar
                      </Button>
                  </div>
              </form>
      </div>
  );
}

export default RegistrarCursos