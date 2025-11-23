import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Usuario from "../../Models/Usuario";
import "./index.css";

const AlterarUsuario = () => {
    const [user, setUser] = useState<Usuario>();
    const [tarefas, setTarefas] = useState<any[]>([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataConclusao, setDataConclusao] = useState<string>("");
    const [editando, setEditando] = useState(false);
    const [novoNome, setNovoNome] = useState("");
    const [novoEmail, setNovoEmail] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    const handleGetUserData = async () => {
        try {
            const resposta: any = await axios.get(
                `http://localhost:5121/usuario/${id}`
            );
            setUser(resposta.data!);
            setNovoNome(resposta.data.nome);
            setNovoEmail(resposta.data.email);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetTarefasByUserId = async () => {
        try {
            const resposta: any = await axios.get(
                `http://localhost:5121/tarefa/usuario/${id}`
            );
            setTarefas(resposta.data!);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateUsuario = async () => {
        try {
            await axios.put(`http://localhost:5121/usuario/${id}`, {
                nome: novoNome,
                email: novoEmail
            });

            handleGetUserData();
            setEditando(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateTask = async () => {
        try {
            let data = dataConclusao ? `${dataConclusao}T00:00:00` : null;

            const tarefa = {
                titulo,
                descricao,
                dataConclusao: data,
                usuarioId: Number(id)
            };

            await axios.post("http://localhost:5121/tarefa", tarefa);
            handleGetTarefasByUserId();

            setTitulo("");
            setDescricao("");
            setDataConclusao("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            await axios.delete(`http://localhost:5121/tarefa/${taskId}`);
            setTarefas((prev) => prev.filter((t) => t.id !== taskId));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetUserData();
        handleGetTarefasByUserId();
    }, []);

    return (
        <div className="alterar-container">

            <div className="user-card">
                <h1 className="title">Usuário</h1>

                <p><strong>ID:</strong> {id}</p>
                <p><strong>Nome:</strong> {user?.nome}</p>
                <p><strong>Email:</strong> {user?.email}</p>

                <button
                    className="btn-secondary"
                    onClick={() => setEditando(!editando)}
                >
                    {editando ? "Cancelar" : "Alterar Usuário"}
                </button>

                {editando && (
                    <div className="edit-user-form">
                        <h3>Editar Usuário</h3>

                        <input
                            className="input"
                            placeholder="Nome"
                            value={novoNome}
                            onChange={(e) => setNovoNome(e.target.value)}
                        />

                        <input
                            className="input"
                            placeholder="Email"
                            value={novoEmail}
                            onChange={(e) => setNovoEmail(e.target.value)}
                        />

                        <button className="btn-primary" onClick={handleUpdateUsuario}>
                            Salvar Alterações
                        </button>
                    </div>
                )}
            </div>

            <div className="create-task-card">
                <h1 className="title">Criar Tarefa</h1>

                <input
                    className="input"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <input
                    className="input"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <input
                    className="input"
                    type="date"
                    value={dataConclusao}
                    onChange={(e) => setDataConclusao(e.target.value)}
                />

                <button className="btn-primary" onClick={handleCreateTask}>
                    Criar Tarefa
                </button>
            </div>

            <div className="tasks-section">
                <h1 className="title">Tarefas</h1>

                {tarefas.map((t) => (
                    <div className="task-card" key={t.id}>
                        <p><strong>Título:</strong> {t.titulo}</p>
                        <p><strong>Descrição:</strong> {t.descricao}</p>
                        <p>
                            <strong>Data Conclusão:</strong>{" "}
                            {t.dataConclusao
                                ? new Date(t.dataConclusao).toLocaleDateString("pt-BR")
                                : "—"}
                        </p>

                        <div className="btn-group">
                            <button
                                className="btn-danger"
                                onClick={() => handleDeleteTask(t.id)}
                            >
                                Excluir
                            </button>

                            <button
                                className="btn-secondary"
                                onClick={() => navigate(`/tarefa/${t.id}`)}
                            >
                                Ver
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AlterarUsuario;
