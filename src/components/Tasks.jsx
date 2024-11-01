import React, { useState } from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'

function Tasks() {
    const context = useKanbanContext()
    const board = context.boards[context.activeBoard]
    
  return (
    <TaskContainer sidemenu={context.sideMenu}>
      {board.columns.map(column => <Column column={column} />
      )}
    </TaskContainer>
  )
}

export default Tasks

//single column display function component

function Column({column}) {
    const context = useKanbanContext()

    return (
        <ColumnWrapper darkMode={context.darkMode}>
        <h2>{column.name}</h2>
            {column.tasks.map(task => {
                
                return <Task columnTask = {task} />
            })}
        </ColumnWrapper>
    )
}



//single task functional component

function Task({columnTask}) {
    const context = useKanbanContext()
    let subtaskCompleted = columnTask.subtasks.filter(subtask => subtask.isCompleted).length;                    

    return(
            <TaskWrapper darkMode = {context.darkMode}
                onClick={() => {
                    //this controlls different modal states
                    context.setModal(true);
                    context.setDetails(true);
                    context.setAddNewTask(false);
                    context.setNewBoardMenu(false);
                    context.setEditBoardMenu(false);
                    context.setSelectedTask(columnTask.title);
                }}
                >
                    <p className='tasktitle'>{columnTask.title}</p>
                    <p className='subtasks'>subtasks {subtaskCompleted} of {columnTask.subtasks.length}</p>
            </TaskWrapper>
    )
}


//styled components

const TaskContainer = styled.div`
    position: absolute;
    top: 121px;
    left: ${(props) => props.sidemenu ? "324px" : "24px"};
    width: 100%;
    height: 100%;
    display: flex;
    gap: 24px;
`

const ColumnWrapper = styled.div`
    width: 280px;
    height: auto;
    color: ${props => props.darkMode ? "#FFFFFF":"#000000"};
`

const TaskWrapper = styled.div`
    width: 280px;
    min-height: 88px;
    margin-bottom: 20px;
    padding: 5px 16px;
    box-sizing: border-box;
    background-color: ${props => props.darkMode ? "#2B2C37":"#FFF"};
    border-radius: 8px;
    color: ${props => props.darkMode ? "#FFFFFF":"#000000"};

    .tasktitle{
        font-family: Plus Jakarta Sans;
        font-size: 15px;
        font-weight: 700;
        line-height: 18.9px;
        text-align: left;
    }

    .subtasks{
        font-family: Plus Jakarta Sans;
        font-size: 12px;
        font-weight: 700;
        line-height: 15.12px;
        text-align: left;
        color: #828FA3;
    }
`