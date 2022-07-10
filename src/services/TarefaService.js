import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

export const TarefaService = {
  getLista: () => fetch(Api.tarefa(), { method: "GET" }).then(parseResponse),
  getById: (id) =>
    fetch(Api.tarefaById(id), { method: "GET" }).then(parseResponse),
  create: (tarefa) =>
    fetch(Api.tarefa(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(tarefa),
    }).then(parseResponse),
  updateById: (id, tarefa_atualizada) =>
    fetch(Api.tarefaById(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(tarefa_atualizada),
    }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.tarefaById(id), { method: "DELETE" }).then(parseResponse),
};
