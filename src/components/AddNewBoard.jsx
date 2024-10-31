import React from 'react'
import styled from 'styled-components'
import { ModalWrapper } from './AddNewTask'
import { useKanbanContext } from '../Hooks/useContext'

function AddNewBoard({setInModal}) {
  const context = useKanbanContext();

  return (
    <ModalWrapper onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}>
      <h2>Add New Board</h2>

      <div className='input-wrapper'>
            <label htmlFor="">Title</label>
            <input type="text" />
        </div>

        <div className='input-wrapper'>
            <label htmlFor="">Subtasks</label>
            <div className='subtask-input'>
                <input type="text" /> <img src="./assets/icon-cross.svg" alt="" />
            </div>
        </div>
      <button class="new-sub-task">+ Add New Subtask</button>
        
      <button className='create-task'>Create Task</button>
    </ModalWrapper>
  )
}

export default AddNewBoard