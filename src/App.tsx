import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AlterarTarefa from './pages/AlterarTarefa';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import AlterarUsuario from './pages/AlterarUsuario';
import "./index.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link className="nav-link" to="/usuarios">Usuários</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/tarefas" element={<TasksPage />} />
                    <Route path="/usuarios" element={<UsersPage />} />
                    <Route path="/usuario/:id" element={<AlterarUsuario />} />
                    <Route path="/tarefa/:id" element={<AlterarTarefa />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
