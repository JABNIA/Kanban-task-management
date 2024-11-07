import { ModalContainer } from "./TaskDetails"
import SelectMenu from "./SelectMenu"
import { useState } from "react"

function EditDetails({context, currentTask, setInModal, setDropDownOpen}) {
    const [taskTitle, setTaskTitle] = useState(currentTask.title)
    const [taskDescription, setTaskDescription] = useState(currentTask.description)
    const [currColumn] = context.boards[context.activeBoard].columns.filter(column => column.tasks.find(task => task === currentTask))
    const currColumnIndex = context.boards[context.activeBoard].columns.findIndex(column => column === currColumn)
    const [taskStatus, setTaskStatus] = useState(currColumn.name);
    const [subtasks, setSubtasks] = useState(currentTask.subtasks);
    let taskVariable = currentTask;

    function handleAddNewSubtask(){
       setSubtasks([...subtasks, {
            title: "",
            isCompleted: false
        }])
        
    }

    function handleSaveChanges() {
        const subtaskInputs = Array.from(document.querySelectorAll(".subtask-field"))
        const subtaskObjects = subtaskInputs.map((element, index) => { return (
                {
                    title: element.value,
                    isCompleted: currentTask.subtasks[index] !== undefined ? currentTask.subtasks[index].isCompleted ? true : false : false
                }
            )   
        })
    
        setSubtasks(subtaskObjects)
        taskVariable.subtasks = subtasks
        
        context.setBoards(
            context.boards.map((board, index) => {
                if(board === context.boards[context.activeBoard]){
                    return{
                        ...board,
                        columns: board.columns.map((column, index) => {
                            if(index === currColumnIndex){
                                return {
                                    ...column,
                                    tasks: column.tasks.map((task, index) => {
                                        if(task === currentTask){
                                            return {
                                                ...task,
                                                subtasks: subtaskObjects,
                                            }
                                        }
                                        return task
                                    })
                                }
                            }
                            return column
                        })
                    }
                }
            return board
            })
        )
        context.setModal(false)
        context.setDetails(false)
    } 

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
            {subtasks.map((subtask, index) => <SubtaskInputInEdit key={index+1} index={index} subtasks={subtasks} setSubtasks={setSubtasks} value={subtask.title}/>)}

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
        setSubtasks(subtasks.filter((element, index) => index !== elIndex).map((element, index) => (element > index+1) ? element - 1 : element))
        
    }

    return (
            <div className='subtask-input subtask'>
                <input type="text" className='subtask-field' onChange={(event => setSubtaskValue(event.target.value))} value={subtaskValue}/> <img src="./assets/icon-cross.svg" alt="closing cross" onClick={() => handleDeleteSubtask(index)}/>
            </div>
    )
}
export default EditDetails;
