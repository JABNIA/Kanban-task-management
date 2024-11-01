function EditDropdown({setDeleteTask, setEdit}) {
    return (
    <div className='edit-menu'>
        <p onClick={() => setEdit(true)}>Edit Task</p>
        <p style={{color: "#EA5555"}} onClick={() => setDeleteTask(true)}>Delete Task</p>
    </div>
    )
}


export default EditDropdown