import { useEffect, useState } from "react";
import "./TarefasList.css";
import FormControl from "./Forms/FormControl";
import TarefaForm from "./Forms/TarefaForm";
import ChecBoxControl from "./Forms/CheckBoxControl";
import { TarefaService } from "../services/TarefaService";
import Overlay from "./Overlay/Overlay";
import Modal from "./Modal/Modal";

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
  const [showTarefaForm, setShowTarefaForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    await TarefaService.deleteById(id);
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
    setShowTarefaForm(false);
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
    setShowDeleteModal(true);
    setTarefa({ tarefa_id: event.target.id });
  };

  const handleConfirmDelete = () => {
    deleteTarefa(tarefa.tarefa_id);
    window.location.reload(true);
  };

  const handleEditTarefa = () => {
    const tarefa_atualizada = { ...tarefaAtualizada };
    const id = tarefa_atualizada.id;

    delete tarefa_atualizada.id;
    setShowTarefaFormEdit(false);
    editTarefa(id, tarefa_atualizada);
  };

  const handleCheckBoxChange = async (event) => {
    const checkbox_value = event.target.checked;
    const tarefa_a_ser_atualizada = await TarefaService.getById(
      event.target.id
    );
    const tarefa_att = { ...tarefa_a_ser_atualizada, feito: checkbox_value };

    await TarefaService.updateById(event.target.id, tarefa_att);
    findAllTarefas();
  };

  const closeModal = () => {
    setShowTarefaForm(false);
  };

  const closeModalEdit = () => {
    setShowTarefaFormEdit(false);
  };

  const closeModalDelete = () => {
    setShowDeleteModal(false);
  };

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
      <button
        type="button"
        className="button"
        onClick={() => setShowTarefaForm(true)}
      >
        Criar Tarefa
      </button>
      {showTarefaForm ? (
        <Modal closeModal={closeModal}>
          <TarefaForm
            id="criar_tarefa"
            onChange={handleChangeCreate}
            label={"Nova tarefa"}
            descricao_value={newTarefa.descricao}
            onClick={handleCreateTarefa}
            button_label={"Criar tarefa"}
          />
        </Modal>
      ) : null}

      {showTarefaFormEdit ? (
        <Modal closeModal={closeModalEdit}>
          <TarefaForm
            onChange={handleChangeEdit}
            descricao_value={tarefaAtualizada.descricao}
            onChangeCheckBox={handleCheckBoxChange}
            checked={tarefaAtualizada.feito}
            onClick={handleEditTarefa}
            button_label={"Concluir"}
          />
        </Modal>
      ) : null}
      {showDeleteModal ? (
        <Modal closeModal={closeModalDelete}>
          Tem certeza que deseja deletar esta tarefa?
          <button
            id={tarefa.id}
            type="button"
            className="button-modal"
            onClick={handleConfirmDelete}
          >
            Sim
          </button>
        </Modal>
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
            <svg
              id={tarefa.id}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              onClick={handleClickEdit}
              className="bi bi-pencil edit"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
            <svg
              id={tarefa.id}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash delete"
              onClick={handleClickDelete}
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TarefasList;
