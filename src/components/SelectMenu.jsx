import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';



function SelectMenu({context, columns, setDropDownOpen, value, setTaskStatus}){
    const [selectValue, setValue] = useState(value)
        // return (
        //     <select name="status" className="status" onFocus={() => setDropDownOpen(true)} onBlur={() => setDropDownOpen(false)} onChange={event => setTaskStatus(event.target.value)} value={value}>
        //         {columns.map(column => <option className='option'>{column.name}</option>)}
        //     </select>
        //     )
        // }
        function handleChange(event) {
            setValue(event.target.value)
        }   


        return( 
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                labelId="column-select-label"
                id="column-select"
                value={selectValue}
                label=""
                onChange={(event) => handleChange(event)}
                style={{color: context.darkMode ? "#FFFFFF" : "#000000"}}
              >
                {columns.map(column => <MenuItem value={column.name}>{column.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        );
      }

export default SelectMenu