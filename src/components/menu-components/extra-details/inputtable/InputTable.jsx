import "./InputTable.css"

function InputTable({status, onChange, currentLocation, text, valid}) {
  return (
    <input disabled={status}
           onChange={onChange}
           type={"text"}
           placeholder={status ? currentLocation : text}
           className={valid ? "valid" : ''}
    />
  )
}

export default InputTable;