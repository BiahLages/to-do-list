const TarefaContext = {
  tarefaEndpoint: () => `${Api.baseUrl}/tarefas`,
  tarefa: () => TarefaContext.tarefaEndpoint(), //url para listar ou criar as tarefas
  tarefaById: (id) => `${TarefaContext.tarefaEndpoint()}/${id}`, //url para recuperar, editar ou deletar tarefas
};

// const urls = {
//   development: "http://localhost:8000",
//   production: "https://todo-rest-beatriz.herokuapp.com"
// };

export const Api = {
  // baseUrl: "http://localhost:8000", //development
  baseUrl: "https://todo-rest-beatriz.herokuapp.com", //production
  // baseUrl: urls[process.env.NODE_ENV],
  // ...TarefaContext
};
