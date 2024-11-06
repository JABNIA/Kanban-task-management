import { ModalContainer } from "./TaskDetails"
import SelectMenu from "./SelectMenu"
import { useState } from "react"

function EditDetails({context, currentTask, setInModal, setDropDownOpen}) {
    const [taskTitle, setTaskTitle] = useState(currentTask.title)
    const [taskDescription, setTaskDescription] = useState(currentTask.description)
    const [currColumn] = context.boards[context.activeBoard].columns.filter(column => column.tasks.find(task => task === currentTask))
    const [taskStatus, setTaskStatus] = useState(currColumn.name);
    const [subtasks, setSubtasks] = useState(currentTask.subtasks);
    

    console.log(subtasks)

    function handleAddNewSubtask(){
       setSubtasks([...subtasks, {
            title: "",
            isCompleted: false
        }])
        
    }

    function handleSaveChanges() {
        const subtaskInputs = Array.from(document.querySelectorAll(".subtask-field"))
        const subtaskObjects = subtaskInputs.map((element, index) => {
            
            if (currentTask.subtasks[index] !== undefined) {
                return (
                    {
                    title: element.value,
                    isCompleted: currentTask.subtasks[index].isCompleted || currentTask.subtasks[index].isCompleted !== undefined ? true : false, 
                } 
            )
            }else {
                return ({
                    title: element.value,
                    isCompleted: false, 
                })
            }

        setSubtasks(subtaskObjects)
    })}

    return (
        <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}>
        <h2>Edit Task</h2>
        <div className='input-wrapper'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" onChange={(event) => setTaskTitle(event.target.value)} value={taskTitle}/>                
        </div>
        <div className='input-wrapper'>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="desc" cols="30" rows="5" onChange={(event) => setTaskDescription(event.target.value)}value={taskDescription}></textarea>
        </div>
        <div className='input-wrapper'>
            <label htmlFor="">Subtasks</label>
            {subtasks.map((subtask, index) => <SubtaskInputInEdit key={index+1} index={index} subtasks={subtask} setSubtasks={setSubtasks} value={subtask.title}/>)}

        </div>
        <button class="new-sub-task" onClick={handleAddNewSubtask}>+ Add New Subtask</button>
        <div className='input-wrapper'  onChange={(event) => setTaskStatus(event.target.value)}>
            <label htmlFor="">Status</label>
            <SelectMenu context={context} columns={context.boards[context.activeBoard].columns} setDropDownOpen={setDropDownOpen} value={taskStatus} setTaskStatus={setTaskStatus}/>
        </div>
    <button className='save-changes' onClick={handleSaveChanges}>Save Changes</button>
    </ModalContainer>
    )
}




function SubtaskInputInEdit({index, subtasks, setSubtasks, value}) {
    const [subtaskValue, setSubtaskValue] = useState(value)

    function handleDeleteSubtask(elIndex) {
        console.log(subtasks)
        setSubtasks(subtasks.filter((element, index) => index !== elIndex).map((element, index) => (element > index+1) ? element - 1 : element))
        
    }

    return (
            <div className='subtask-input subtask'>
                <input type="text" className='subtask-field' onChange={(event => setSubtaskValue(event.target.value))} value={subtaskValue}/> <img src="./assets/icon-cross.svg" alt="closing cross" onClick={() => handleDeleteSubtask(index)}/>
            </div>
    )
}
export default EditDetails;
