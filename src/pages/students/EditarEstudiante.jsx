import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById, updateCourse } from '../../api/Courses/Course';
import { Box, TextField, Button, Alert } from '@mui/material';
import { getStudentById, updateStudent } from '../../api/Students/Student';

const EditarEstudiante = () => {
    const studentId = useParams();
    let navigate = useNavigate();


    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [age, setage] = useState('');
    const [alert, setAlert] = useState(false);
    const [studentData, setstudentData] = useState(null);


    useEffect(() => {
        getStudentData();
    }, []);

    const getStudentData = async () => {
        try {
          const studentData = await getStudentById(studentId.id);
          setstudentData(studentData)
          setname(studentData.name);
          setlastname(studentData.last_name);
          setemail(studentData.email);
          setage(studentData.age);
        } catch (error) {
          console.log(error);
        }
      };

    const hangdleSubmit = async (e) => {
        try {
            const studentData = {
                name: name,
                last_name: lastname,
                email: email,
                age: age
            }
            const updatedStudent = await updateStudent(studentId.id, studentData);
            
            console.log(updatedStudent);
            if (updatedStudent.status === 'success') {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                    return navigate("/estudiantes");
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
            {alert !== false ? <Alert severity="success">Se ha actualizado correctamente el estudiante</Alert> : null}
            {studentData !== null ? (
                <form style={{ display: 'grid' }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Nombre"
                    defaultValue={name}
                    type='text'
                    onChange={(e) => setname(e.target.value)}
                    sx={{ marginBottom: '1rem' }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Apellido"
                    defaultValue={lastname}
                    type='text'
                    onChange={(e) => setlastname(e.target.value)}
                    sx={{ marginBottom: '1rem' }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Edad"
                    defaultValue={age}
                    type='number'
                    onChange={(e) => setage(e.target.value)}
                    sx={{ marginBottom: '1rem' }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Nombre"
                    defaultValue={email}
                    type='email'
                    onChange={(e) => setemail(e.target.value)}
                    sx={{ marginBottom: '1rem' }}
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

export default EditarEstudiante;
