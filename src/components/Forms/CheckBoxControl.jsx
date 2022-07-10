function ChecBoxControl(props) {
    return(
        <div className="form-check">
            <input
        type="checkbox"
        className="check-input"
        id="props.id"
        onChange={props.onChange}
        name={props.name}
        checked={props.checked}
        />
        <label className="check-label" htmlFor={props.id}>{props.label}</label>
        </div>
        
    )
}

export default ChecBoxControl;