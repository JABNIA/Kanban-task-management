function SelectMenu({context, columns, setDropDownOpen, value, setTaskStatus}){
    
        return (
            <select name="status" className="status" onFocus={() => setDropDownOpen(true)} onBlur={() => setDropDownOpen(false)} onChange={event => setTaskStatus(event.target.value)} value={value}>
                {columns.map(column => <option className='option'>{column.name}</option>)}
            </select>
            )
        }

export default SelectMenu