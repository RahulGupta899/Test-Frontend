
import React from 'react'
import {TextField} from '@mui/material'

import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DatePicker} from  '@mui/x-date-pickers/DatePicker'


const MuiDatePicker = ({selectedDate,setSelectedDate}) => {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker 
          renderInput={(params)=> <TextField {...params}/> }
          value={selectedDate}
          onChange={(newVal)=>{setSelectedDate(newVal)}}
      />
    </LocalizationProvider>
  )
}

export default MuiDatePicker