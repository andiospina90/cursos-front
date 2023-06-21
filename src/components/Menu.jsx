import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="Menu">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/cursos">Cursos</Link>
        </li>
        <li>
          <Link to="/estudiantes">Estudiantes</Link>
        </li>
        <li>
          <Link to="/asignacion">Asignación</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
