const TarefaContext = {
  tarefaEndpoint: () => `${Api.baseUrl}/tarefas`,
  tarefa: () => TarefaContext.tarefaEndpoint(), //url para listar ou criar as tarefas
  tarefaById: (id) => `${TarefaContext.tarefaEndpoint()}/${id}`, //url para recuperar, editar ou deletar tarefas
};

export const Api = {
  baseUrl: "http://localhost:8000",
  ...TarefaContext,
};
