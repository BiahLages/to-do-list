import ChecBoxControl from "./CheckBoxControl";
import FormControl from "./FormControl";

function TarefaForm(props) {
  return (
    <div className="create-form">
      <FormControl
        id={props.id}
        label={props.label}
        type="text"
        onChange={props.onChange}
        name="descricao"
        value={props.descricao_value}
      />
      {/* <ChecBoxControl 
        id="feito"
        label="Feito"
        onChange={props.onChangeCheckBox} 
        name="feito"
        checked= {props.checked}
      /> */}
      <button
        type="button"
        className="button"
        onClick={props.onClick}
      >
        {props.button_label}
      </button>
    </div>
  );
}
export default TarefaForm;
