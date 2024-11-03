function SelectMenu({context, columns, setDropDownOpen}){
    
        return (
            <select name="status" className="status" onFocus={() => setDropDownOpen(true)} onBlur={() => setDropDownOpen(false)}>
                {columns.map(column => <option className='option'>{column.name}</option>)}
            </select>
            )
        }

export default SelectMenu