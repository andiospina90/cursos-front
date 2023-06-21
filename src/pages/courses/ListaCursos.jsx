import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCourse, getCourses } from '../../api/Courses/Course';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListaCursos = () => {

  const [cursos, setcursos] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const cursosData = await getCourses();
      setcursos(cursosData);
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
  return (
    <div style={{padding:'1rem'}}>
      <h1> Cursos</h1>
      <div style={{paddingBottom:'20px'}}>
      <Button component={Link} to="/curso/registrar" variant="contained" color="primary" endIcon={<AddCircleIcon />}>
        Nuevo Curso
      </Button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Duración</TableCell>
                <TableCell>Fecha Inicio</TableCell>
                <TableCell>Fecha Fin</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cursos.map((curso) => (
                <TableRow key={curso.id}>
                  <TableCell>{curso.id}</TableCell>
                  <TableCell>{curso.course_name}</TableCell>
                  <TableCell>{`${curso.course_duration} Dias`}</TableCell>
                  <TableCell>{curso.course_start_date}</TableCell>
                  <TableCell>{curso.course_end_date}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/curso/${curso.id}`} variant="contained" color="primary" endIcon={<EditIcon/>}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={()=>handleDeleteCourse(curso.id)} endIcon={<DeleteIcon/>}>
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

export default ListaCursos