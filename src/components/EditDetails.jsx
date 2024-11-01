import { ModalContainer } from "./TaskDetails"
import SelectMenu from "./SelectMenu"


function EditDetails({context, currentTask, setInModal, setDropDownOpen}) {
    return (
        <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}>
        <h2>Edit Task</h2>
        <div className='input-wrapper'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={currentTask.title}/>                
        </div>
        <div className='input-wrapper'>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="desc" cols="30" rows="5"></textarea>
        </div>
        <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
            <label htmlFor="">Subtasks</label>
            {currentTask.subtasks.map(subtask => { return(
                <div className='subtask-input'>
                    <input type="text" value={subtask.title} /> <img src="./assets/icon-cross.svg" alt="cllosing cross" />
                </div>
                    )
                }
            )}
        </div>
        <button class="new-sub-task">+ Add New Subtask</button>
        <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
            <label htmlFor="">Status</label>
            <SelectMenu context={context} columns={context.boards[context.activeBoard].columns} setDropDownOpen={setDropDownOpen}/>
        </div>
    <button className='save-changes'>Save Changes</button>
    </ModalContainer>
    )
}


export default EditDetails