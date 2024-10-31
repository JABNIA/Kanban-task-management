import React from 'react'
import { ModalWrapper } from './AddNewTask';
import { useKanbanContext } from '../Hooks/useContext';


function EditBoard({setInModal, setDropDownOpen}) {
    const context = useKanbanContext()

    if (context.deleteBoardModal === true){
        return (
            <ModalWrapper darkMode={context.darkMode}> 
                <h2 className='modal-title'>Delete Board?</h2>
                <p className="warning">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                <div className='btn-container'>
                    <button className='btn delete-task'>Delete</button>
                    <button className='btn cancel-delete'>Cancel</button>
                </div>
           </ModalWrapper>
        )
    }else{
        return (
            <ModalWrapper darkMode={context.darkMode}>
        <h2>Edit Board</h2>
            <div className='input-wrapper'>
                <label htmlFor="title">Board Name</label>
                <input type="text" name="title" value={context.boards[context.activeBoard].name}/>                
            </div>
            <div className='input-wrapper' onMouseEnter={() => setInModal(true)} onMouseLeave={() => setInModal(false)}>
                <label htmlFor="">Columns</label>
                {context.boards[context.activeBoard].columns.map(column => {
                    return(
                        <div className='subtask-input'>
                            <input type='text' value={column.name} /> <img src="./assets/icon-cross.svg" alt="cllosing cross" />
                        </div>
                    )
                }) }
            </div>
            <button class="new-sub-task">+ Add New Column</button>
            <button className='save-changes'>Save Changes</button>
    </ModalWrapper>
  )
}
}

export default EditBoard


