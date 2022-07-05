import FormControl from "./FormControl"

function TarefaForm(props){
    return (
        <div>
                <FormControl
                    id="criar_descrição"
                    label="Nova tarefa"
                    type="text"
                    onChange={props.onChange}
                    name="descricao"
                    value={props.descricao_value}
                />
                <button type="button" 
                className={`btn btn-danger`}
                onClick={props.onClick}>
                    {props.button_label}
                </button>
        </div>
    )
}
export default TarefaForm