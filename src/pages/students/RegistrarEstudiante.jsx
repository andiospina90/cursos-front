import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../../api/Students/Student';

const RegistrarEstudiante = () => {

    let navigate = useNavigate();


    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [age, setage] = useState('');
    const [alert, setAlert] = useState(false);

    const hangdleSubmit = async (e) => {
        try {
            const studentData = {
                name: name,
                last_name: lastname,
                email: email,
                age: age
            }
            const createdStudent = await createStudent(studentData);

            if (createdStudent.status === 'success') {
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
            <h1>Registrar Curso</h1>
            {alert !== false ? <Alert severity="success" style={{marginBottom:'1rem'}}>Se registrado correctemente el estudiante</Alert> : null}
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
        </div>
    );
}

export default RegistrarEstudiante