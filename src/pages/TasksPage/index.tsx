import { useEffect, useState } from "react";
import axios from "axios";
import Usuario from "../../Models/Usuario";
import "./index.css";

export default function TasksPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [usuarios, setusuarios] = useState<any[]>([]);

  const handleCreateUser = async () => {
    try {
      const usuario: Usuario = { nome, email };
      await axios.post("http://localhost:5121/tarefa", usuario);
      handleListUsers();
      setNome("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleListUsers = async () => {
    try {
      const resposta: any = await axios.get("http://localhost:5121/tarefa");
      setusuarios(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleListUsers();
  }, []);

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Tarefas</h1>

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
          Criar Tarefa
        </button>
      </div>

      <ul className="tasks-list">
        {usuarios.map((u: any) => (
          <li className="task-card" key={u.id}>
            <p className="task-name">{u.nome}</p>
            <p className="task-email">{u.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
