import { useEffect, useState } from "react";
import "./TarefasList.css";
import FormControl from "./Forms/FormControl";
import TarefaForm from "./Forms/TarefaForm";
import ChecBoxControl from "./Forms/CheckBoxControl";
import { TarefaService } from "../services/TarefaService";

function TarefasList() {
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

  async function handleCheckBoxChange(event) {
    setTarefaAtualizada({ ...tarefaAtualizada, feito: event.target.checked });
    // const checkbox_value = event.target.checked;
    // const tarefa_a_ser_atualizada = await TarefaService.getById(event.target.id);
    // const tarefa_att = {...tarefa_a_ser_atualizada, done: checkbox_value}

    // await TarefaService.updateById(event.target.id, tarefa_att)
    // findAllTarefas()
  }

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
          <div className="card-content">
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
              className="button-edit"
              onClick={handleClickEdit}
            > Editar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
            <button
              id={tarefa.id}
              type="button"
              className="button-delete"
              onClick={handleClickDelete}
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TarefasList;
