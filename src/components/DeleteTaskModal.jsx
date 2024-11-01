import { ModalContainer } from "./TaskDetails"

function DeleteTask({context, currentTask, setInModal}) {
    return (
            <ModalContainer onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}> 
                <h2 className='modal-title'>Delete Task?</h2>
                <p className="warning">Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
                <div className='btn-container'>
                    <button className='btn delete-task'>Delete</button>
                    <button className='btn cancel-delete'>Cancel</button>
                </div>
            </ModalContainer>
    )
}

export default DeleteTask