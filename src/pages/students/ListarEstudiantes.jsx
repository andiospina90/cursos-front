import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteStudent, getStudents } from '../../api/Students/Student';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListarEstudiantes = () => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const studentData = await getStudents();
      setStudents(studentData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{padding:'1rem'}}>
      <h1> Estudiantes </h1>
      <div style={{paddingBottom:'20px'}}>
      <Button component={Link} to="/estudiante/registrar" variant="contained" color="primary" endIcon={<AddCircleIcon />}>
        Nuevo Estudiante
      </Button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo Electronico</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((estudiante) => (
                <TableRow key={estudiante.id}>
                  <TableCell>{estudiante.id}</TableCell>
                  <TableCell>{`${estudiante.name} ${estudiante.last_name}`}</TableCell>
                  <TableCell>{estudiante.email}</TableCell>
                  <TableCell>{estudiante.age}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/estudiante/${estudiante.id}`} variant="contained" color="primary" endIcon={<EditIcon/>}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={()=>handleDeleteStudent(estudiante.id)} endIcon={<DeleteIcon/>}>
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

export default ListarEstudiantes