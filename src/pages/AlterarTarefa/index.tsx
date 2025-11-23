import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

const AlterarTarefa = () => {
    const { id } = useParams();

    const [tarefa, setTarefa] = useState<any>();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataConclusao, setDataConclusao] = useState<string>("");

    const handleGetTaskData = async () => {
        try {
            const resposta = await axios.get(`http://localhost:5121/tarefa/${id}`);
            const t = resposta.data;
            setTarefa(t);

            setTitulo(t.titulo);
            setDescricao(t.descricao);
            setDataConclusao(
                t.dataConclusao ? t.dataConclusao.substring(0, 10) : ""
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleSalvar = async () => {
        try {
            let data = dataConclusao ? `${dataConclusao}T00:00:00` : null;

            await axios.put(`http://localhost:5121/tarefa/${id}`, {
                titulo,
                descricao,
                dataConclusao: data
            });

            alert("Tarefa atualizada com sucesso!");

            handleGetTaskData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetTaskData();
    }, []);

    return (
        <div className="page-container">
            <div className="card">
                <h1 className="page-title">Alterar Tarefa</h1>
                <p className="task-id">ID da tarefa: {id}</p>

                {tarefa && (
                    <div className="task-info">
                        <p><strong>Título atual:</strong> {tarefa.titulo}</p>
                        <p><strong>Descrição atual:</strong> {tarefa.descricao}</p>
                        <p>
                            <strong>Data Conclusão atual:</strong>{" "}
                            {tarefa.dataConclusao
                                ? new Date(tarefa.dataConclusao).toLocaleDateString("pt-BR")
                                : "—"}
                        </p>
                    </div>
                )}

                <hr className="divider" />

                <div className="form-section">
                    <h2 className="section-title">Editar</h2>

                    <input
                        className="input"
                        placeholder="Novo título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />

                    <input
                        className="input"
                        placeholder="Nova descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <input
                        className="input"
                        type="date"
                        value={dataConclusao}
                        onChange={(e) => setDataConclusao(e.target.value)}
                    />

                    <button className="btn-primary" onClick={handleSalvar}>
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlterarTarefa;
