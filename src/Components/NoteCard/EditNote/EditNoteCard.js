import React, { useState } from 'react'
import { Input, MenuItem, InputLabel, Box, FormControl, Select } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

import './EditNoteCard.css'

const EditNoteCard = (props) => {
    const [Title, setTitle] = useState(props.Title)
    const [Description, setDescription] = useState(props.Description)
    const [tag, setTag] = useState(props.Tag.toString());
    const [IsValid, setIsValid] = useState(false)
    const [open, setOpen] = useState(true);

    //Added for material ui 
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    //Checks the inputs and saves the note
    const checkHandler = () => {
        if (Title.length > 3 || Description.length > 5) {
            if (tag === '') { setTag('General') }
            props.Edit(Title, Description, tag)
            props.Close()
            setTitle('')
            setDescription('')
            setTag('')
        }
        else {
            setIsValid(true)

        }
    }




    return (
        <ThemeProvider theme={darkTheme} >
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', position: 'absolute' }}>
                <div className='add-notes-maincontainer' >
                    <div className='cancel-container' >
                        <Tooltip title="Cancel" placement="top" arrow >
                            <HighlightOffRoundedIcon style={{ cursor: 'pointer' }} onClick={props.Close}></HighlightOffRoundedIcon>
                        </Tooltip>
                    </div>
                    <div className='add-notes-title'>
                        <Input placeholder='Title'
                            value={Title}
                            style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}
                            onChange={(e) => { setTitle(e.target.value) }}
                            disableUnderline={true}
                        />
                    </div>
                    <div className='add-notes-description'>
                        <Input placeholder='Write a note...'
                            value={Description}
                            style={{ color: 'white', width: '100%' }}
                            onChange={(e) => { setDescription(e.target.value) }}
                            disableUnderline={true} />

                    </div>
                    <div className='add-notes-tags-selection-container'>
                        <Box sx={{ minWidth: 80 }} >
                            <FormControl sx={{ m: 1 }} style={{ width: '160px', marginTop: '20px' }} size="small">
                                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tag}
                                    label="Tag"
                                    onChange={(e) => { setTag(e.target.value); }}
                                    style={{ color: 'white' }}
                                >
                                    <MenuItem value={'General'}>General</MenuItem>
                                    <MenuItem value={'Personal'}>Personal</MenuItem>
                                    <MenuItem value={'To-Do'}>To-Do</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    {Title !== '' && Description !== '' && <div className='save-container'>
                        <Tooltip title="Save" placement="bottom" arrow>
                            <CheckCircleOutlineRoundedIcon onClick={checkHandler} style={{ cursor: 'pointer', fontSize: '40px' }}></CheckCircleOutlineRoundedIcon>
                        </Tooltip>
                    </div>}
                </div>
                {IsValid && <Box sx={{ width: '31%' }}>
                    <Collapse in={open}>
                        <Alert
                            variant="outlined"
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {Title.length <= 3 ? 'The Title must be more than 3 letters' : 'The description must be of more than 5 letters'}
                        </Alert>
                    </Collapse></Box>}

            </div>

        </ThemeProvider>
    )
}

export default EditNoteCard