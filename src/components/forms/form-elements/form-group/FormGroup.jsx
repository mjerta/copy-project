import "./FormGroup.css"

function FormGroup({type, labelAndID, labelText, register, errors, name}) {
  return (
    <>
      <div className="form-group">
        <label htmlFor={labelAndID}>{labelText}</label>
        <input
          type={type}
          id={labelAndID}
          {...register}
        />
        {errors && errors[name] &&
          <p className="error-message">{errors[name].message}</p>}
      </div>
    </>
  )
}

export default FormGroup;