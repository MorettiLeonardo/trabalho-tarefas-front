import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Usuario from "../../Models/Usuario";
import "./index.css";

export default function UsersPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuarios, setusuarios] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const usuario: Usuario = { nome, email };
      await axios.post("http://localhost:5121/usuario", usuario);
      handleListUsers();
      setNome("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleListUsers = async () => {
    try {
      const resposta: any = await axios.get("http://localhost:5121/usuario");
      setusuarios(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5121/usuario/${id}`);
      handleListUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleListUsers();
  }, []);

  return (
    <div className="users-container">
      <h1 className="users-title">Usuários</h1>

      <div className="form-container">
        <input
          className="input"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn-primary" onClick={handleCreateUser}>
          Criar Usuário
        </button>
      </div>

      <ul className="users-list">
        {usuarios.map((u: any) => (
          <li className="user-card" key={u.email}>
            <div>
              <p className="user-id">ID: {u.id}</p>
              <p className="user-name">{u.nome}</p>
              <p className="user-email">{u.email}</p>

              <div className="user-actions">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(`/usuario/${u.id}`)}
                >
                  Ver usuário
                </button>

                <button
                  className="btn-danger"
                  onClick={() => handleDeleteUser(u.id)}
                >
                  Deletar usuário
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
