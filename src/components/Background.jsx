import React, { useState } from 'react'
import styled from 'styled-components'
import { useKanbanContext } from '../Hooks/useContext'
import TaskDetails from './TaskDetails'
import AddNewTask from './AddNewTask'

function Background() {
  const context = useKanbanContext()
  const [inModal, setInModal] = useState(false)
  const [dropDownOpen, setDropDownOpen] = useState(false)
  function handleClick() {
    if (inModal === false && dropDownOpen === false){
      context.setModal(false)
    }
  }

  return (
    <ModalBackground onClick={handleClick} id='background'>
      {context.details ? <TaskDetails setInModal={setInModal} setDropDownOpen ={setDropDownOpen}/> : null}
      {context.addNewTask ? <AddNewTask setInModal={setInModal} setDropDownOpen ={setDropDownOpen}/> : null}
    </ModalBackground>
  )
}

export default Background



const ModalBackground = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #00000050;
    z-index: 12;
`