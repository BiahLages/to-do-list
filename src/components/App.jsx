import { useEffect, useState } from "react";
import "./App.css";
import FormControl from "./Forms/FormControl";
import TarefaForm from "./Forms/TarefaForm";

function App() {
  const [tarefasList, setTarefasList] = useState([]);
  const [tarefa, setTarefa] = useState({
    tarefa_id: "",
  });
  const [newTarefa, setNewTarefa] = useState({
    descricao: "",
  });

  const baseURL = "http://localhost:8000/tarefas";

  async function findAllTarefas() {
    const response = await fetch(baseURL);
    const tarefas = await response.json();
    setTarefasList(tarefas);
  }

  async function findOneTarefa(id) {
    const response = await fetch(`${baseURL}/${id}`);
    const tarefa = await response.json();
    setTarefasList([tarefa]);
  }

  async function create(tarefa) {
    const response = await fetch(baseURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(tarefa),
    });
    const newTarefa = await response.json();
    setNewTarefa([newTarefa]);
  }

  useEffect(() => {
    findAllTarefas();
  }, []);

  const handleChange = (event) => {
    setTarefa({ ...tarefa, [event.target.name]: event.target.value });
  };

  const handleChangeCreate = (event) => {
    setNewTarefa({ ...newTarefa, [event.target.name]: event.target.value });
  };

  const handleClick = (event) => {
    const tarefa_id_search = tarefa.tarefa_id;
    findOneTarefa(tarefa_id_search);
  };

  const handleCreateTarefa = () => {
    const tarefa_a_ser_criada = { ...newTarefa };
    create(tarefa_a_ser_criada);
    setNewTarefa({
      descricao: "",
    });
  };

  useEffect(() => {
    findAllTarefas();
  }, [newTarefa]);

  console.log(tarefasList);

  return (
    <div className="Tarefas">
      <FormControl
        id="buscarTarefa"
        label="Pesquise uma tarefa"
        type="text"
        onChange={handleChange}
        name="tarefa_id"
        value={tarefa.tarefa_id}
      />
      <button type="button" className="button" onClick={handleClick}>
        Pesquisar
      </button>
      <TarefaForm
        onChange={handleChangeCreate}
        descricao_value={newTarefa.descricao}
        onClick={handleCreateTarefa}
        button_label={"Criar tarefa"}
      />
      {tarefasList.map((tarefa, index) => (
        <div key={index} className="card">
          <p className="text">{tarefa.descricao}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
