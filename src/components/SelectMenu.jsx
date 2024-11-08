import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import styled from 'styled-components';
import {useKanbanContext} from '../Hooks/useContext';


function SelectMenu({context, columns, setDropDownOpen, value, setTaskStatus}){
    const [selectMenuOpen, setSelectMenuOpen] = useState(false);
    const [selectValue, setValue] = useState(value);

        function handleClick() {
          setSelectMenuOpen(curr => !curr);
        }
        function handleChange(event) {
            setValue(event.target.value)
        }   

        return( 
          <SelectMenuWrapper>
            <p className="selectMenu" onClick={handleClick}>{selectValue}</p>
            <SelectArrow>
              <img src="./assets/icon-chevron-down.svg" alt="select menu opening arrow" />
            </SelectArrow>
            {selectMenuOpen && <SelectionMenu columns={columns} setValue={setValue} setSelectMenuOpen = {setSelectMenuOpen}/>}
          </SelectMenuWrapper>    
        );
      }

export default SelectMenu

function SelectionMenu({columns, setValue, setSelectMenuOpen}) {
  const context = useKanbanContext()
  return (
    <SelectionMenuWrapper darkMode={context.darkMode}>
      {columns.map(column => <p className='column-name' onClick={() => {
        setValue(column.name)
        setSelectMenuOpen(false)
        }}>{column.name}</p>)}
    </SelectionMenuWrapper>)
}



const SelectionMenuWrapper = styled.div`
  position: absolute;
  width: 416px;
  height: 117px;
  background-color: ${props => props.darkMode? "#2B2C37" : "#FFFFFF"};
  color: #828FA3;
  border-radius: 8px;

  .column-name{
    padding-left: 16px;
    font-family: Plus Jakarta Sans;
    font-size: 13px;
    font-weight: 500;
    line-height: 23px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .column-name:hover {
    background-color: #828FA3;
    color: #000000;
    cursor: pointer;
  }
`

const SelectArrow = styled.span`
  position: absolute;
  top: 10.55px;
  right: 15.8px;
  display: block;
`

const SelectMenuWrapper = styled.div`
  position: relative;
  width: 416px;

  .selectMenu {
    width: 416px;
    height: 40px;
    padding-top: 8px;
    padding-left: 16px;
    font-family: Plus Jakarta Sans;
    font-size: 13px;
    font-weight: 500;
    line-height: 23px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    border: 1px solid #828FA340;

  }
  img {
    margin-top: 0px;
    width: 15px;
    height: 10px;
  }
`