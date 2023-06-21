import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import ListaCursos from './pages/courses/ListaCursos';
import Menu from './components/Menu';
import './App.css'; // Importa el archivo de estilos CSS
import RegistrarCursos from './pages/courses/RegistrarCursos';
import Home from './pages/home/Home';
import EditarCurso from './pages/courses/EditarCurso';
import ListarEstudiantes from './pages/students/ListarEstudiantes';
import RegistrarEstudiante from './pages/students/RegistrarEstudiante';
import EditarEstudiante from './pages/students/EditarEstudiante';
import ListaCursosEstudiantes from './pages/enrollment/ListaCursosEstudiantes';

function App() {
  return (
    <div className="App">
      <Menu />
      <div className="App-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<ListaCursos />} />
          <Route path="/curso/registrar" element={<RegistrarCursos/>} />
          <Route path="/curso/:id" element={<EditarCurso />} />
          <Route path="/estudiantes" element={<ListarEstudiantes />} />
          <Route path="/estudiante/registrar" element={<RegistrarEstudiante />} />
          <Route path="/estudiante/:id" element={<EditarEstudiante />} />
          <Route path="/asignacion" element={<ListaCursosEstudiantes/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;