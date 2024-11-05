import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalWrapper } from './AddNewTask'
import { useKanbanContext } from '../Hooks/useContext'

function AddNewBoard({setInModal}) {
  const context = useKanbanContext();
  const [boardTitle, setBoardTitle] = useState("")

  function handleAddNewBoard() {
    const columns = Array.from(document.querySelectorAll(".column-name")) 
    const columnNames = columns.map(element => ({name: element.value, tasks: [], })) 
    console.log(columnNames)
    if(boardTitle !=="") {
        context.setBoards(
          [...context.boards, 
            {
              name: boardTitle,
              columns: columnNames
            }
          ]
        )
      }
  }


  return (
    <ModalWrapper onMouseEnter={()=> setInModal(true)} onMouseLeave={()=> setInModal(false)} darkMode={context.darkMode}>
      <h2>Add New Board</h2>

      <div className='input-wrapper'>
            <label htmlFor="">Title</label>
            <input type="text" onChange={(event) => setBoardTitle(event.target.value)}/>
        </div>

        <div className='input-wrapper'>
            <label htmlFor="">Columns</label>
            <div className='subtask-input'>
                <input type="text" className='column-name'/> <img src="./assets/icon-cross.svg" alt="Delete column name" />
            </div>
        </div>
      <button class="new-sub-task">+ Add New Column</button>
        
      <button className='create-task' onClick ={handleAddNewBoard}>Create Board</button>
    </ModalWrapper>
  )
}

export default AddNewBoard