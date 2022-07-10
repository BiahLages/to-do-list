import { useEffect, useState } from "react";
import "./App.css";
import FormControl from "./Forms/FormControl";
import TarefaForm from "./Forms/TarefaForm";
import ChecBoxControl from "./Forms/CheckBoxControl";
import { TarefaService } from "../services/TarefaService";

function App() {
  const [tarefasList, setTarefasList] = useState([]);
  const [tarefa, setTarefa] = useState({
    tarefa_id: "",
  });
  const [newTarefa, setNewTarefa] = useState({
    descricao: "",
    feito: false,
  });

  const [tarefaAtualizada, setTarefaAtualizada] = useState({
    descricao: "",
    feito: false,
    id: "",
  });

  const [showTarefaFormEdit, setShowTarefaFormEdit] = useState(false);

  const baseURL = "http://localhost:8000/tarefas";

  async function findAllTarefas() {
    const tarefas = await TarefaService.getLista();
    setTarefasList(tarefas);
  }

  async function findOneTarefa(id) {
    const tarefa = await TarefaService.getById(id);
    setTarefasList([tarefa]);
  }

  async function create(tarefa) {
    const newTarefa = await TarefaService.create(tarefa);
    setNewTarefa([newTarefa]);
  }

  async function editTarefa(id, tarefa_atualizada) {
    const response_tarefa_atualizada = await TarefaService.updateById(
      id,
      tarefa_atualizada
    );
    setTarefaAtualizada({ ...response_tarefa_atualizada });
  }

  async function deleteTarefa(id) {
    const response_delete = await TarefaService.deleteById(id);
  }

  useEffect(() => {
    findAllTarefas();
  }, [newTarefa, tarefaAtualizada]);

  const handleChange = (event) => {
    setTarefa({ ...tarefa, [event.target.name]: event.target.value });
  };

  const handleChangeCreate = (event) => {
    setNewTarefa({ ...newTarefa, [event.target.name]: event.target.value });
  };

  const handleChangeEdit = (event) => {
    setTarefaAtualizada({
      ...tarefaAtualizada,
      [event.target.name]: event.target.value,
    });
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

  const handleClickEdit = async (event) => {
    setShowTarefaFormEdit(true);
    setTarefaAtualizada({ ...tarefaAtualizada, id: event.target.id });
    const tarefa = await TarefaService.getById(event.target.id);
    setTarefaAtualizada({ ...tarefaAtualizada, ...tarefa });
  };

  const handleClickDelete = (event) => {
    deleteTarefa(event.target.id);
    window.location.reload(true);
  };

  const handleEditTarefa = () => {
    const tarefa_atualizada = { ...tarefaAtualizada };
    const id = tarefa_atualizada.id;

    delete tarefa_atualizada.id;
    setShowTarefaFormEdit(false);
    editTarefa(id, tarefa_atualizada);
  };

  function handleCheckBoxChange(event) {
    console.log(event.target.checked);
    setTarefaAtualizada({ ...tarefaAtualizada, feito: event.target.checked });
  }

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
        id="criar_tarefa"
        onChange={handleChangeCreate}
        label={"Nova tarefa"}
        descricao_value={newTarefa.descricao}
        onClick={handleCreateTarefa}
        button_label={"Criar tarefa"}
      />
      {showTarefaFormEdit ? (
        <TarefaForm
          onChange={handleChangeEdit}
          descricao_value={tarefaAtualizada.descricao}
          onChangeCheckBox={handleCheckBoxChange}
          checked={tarefaAtualizada.feito}
          onClick={handleEditTarefa}
          button_label={"Editar Tarefa"}
        />
      ) : null}

      {tarefasList.map((tarefa, index) => (
        <div key={index} className="card">
          <p className="text">{tarefa.descricao}</p>
          <ChecBoxControl
            id={tarefa.id}
            label="Feito"
            onChange={handleCheckBoxChange}
            name="feito"
            checked={tarefa.feito}
          />
          <button
            id={tarefa.id}
            type="button"
            className="button"
            onClick={handleClickEdit}
          >
            Editar
          </button>
          <button
            id={tarefa.id}
            type="button"
            className="button"
            onClick={handleClickDelete}
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
