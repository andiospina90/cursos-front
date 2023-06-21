import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById, updateCourse } from '../../api/Courses/Course';
import { Box, TextField, Button, Alert } from '@mui/material';

const EditarCurso = () => {
    const cursoId = useParams();
    let navigate = useNavigate();


    const [course, setCourse] = useState(null);
    const [course_name, setcourse_name] = useState('');
    const [course_duration, setcourse_duration] = useState('');
    const [course_start_date, setcourse_start_date] = useState('');
    const [course_end_date, setcourse_end_date] = useState('');
    const [alert, setAlert] = useState(false);


    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = async () => {
        try {
            const course = await getCourseById(cursoId.id);
            setCourse(course);

            const startDate = course.course_start_date.split(' ')[0];
            const endDate = course.course_end_date.split(' ')[0];

            setcourse_start_date(startDate);
            setcourse_end_date(endDate);
            setcourse_name(course.course_name);
            setcourse_duration(course.course_duration);
            console.log(course);
        } catch (error) {
            console.log(error);
        }
    };

    const hangdleSubmit = async (e) => {
        try {
            const courseData = {
                course_name,
                course_duration,
                course_start_date,
                course_end_date
            }
            const updatedCourse = await updateCourse(cursoId.id, courseData);
            console.log(updatedCourse);
            if (updatedCourse.status === 'success') {
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
            <h1>Editar Curso</h1>
            {alert !== false ? <Alert severity="success" style={{marginBottom:'1rem'}}>Se ha actualizado correctamente el curso</Alert> : null}
            {course !== null ? (
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
                        defaultValue={course.course_start_date}
                        value={course_start_date}
                        onChange={(e) => setcourse_start_date(e.target.value)}
                        type='date'
                        sx={{ marginBottom: '1rem' }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Fecha fin"
                        defaultValue={course.course_end_date}
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
            ) : null}
        </div>
    );
};

export default EditarCurso;
