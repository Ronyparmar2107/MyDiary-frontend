import React, { useState } from 'react'
import { Input, MenuItem, InputLabel, Box, FormControl, Select, colors, listItemClasses } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';

import './AddNoteCard.css'

const NoteCard = (props) => {
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [IsOpen, setIsOpen] = useState(false)
    const [tag, setTag] = React.useState('');
    const [IsValid, setIsValid] = useState(false)
    const [open, setOpen] = React.useState(true);

    //Added for material ui 
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    //Closes the Model
    const closeHandler = () => {
        setIsOpen(false)
    }

    //Checks the inputs and saves the note
    const checkHandler = async () => {
        if (Title.length > 3 || Description.length > 5) {
            if (tag === '') { setTag('General') }

            const NoteData = {
                title: Title,
                description: Description,
                tag: tag
            }
            const authtoken = localStorage.getItem('authtoken')
            const response = await fetch('http://localhost:3001/api/note/createnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": authtoken.toString()
                },
                body: JSON.stringify(NoteData)
            })

            let res = response.json()
            props.newNoteAdded()
            console.log(res)
            setIsOpen(false)
            setTitle('')
            setDescription('')
            setTag('')
        }
        else {
            setIsValid(true)

        }
    }

    const notesType = [
        {
            value: 'General',
            color: ''
        },
        {
            value: 'To-Do',
            color: '#d64933'
        },
        {
            value: 'Critical',
            color: '#b39c4d'
        },
        {
            value: 'Schedule',
            color: '#005291'
        },
        {
            value: 'Resource',
            color: '#401818'
        },

    ]


    return (
        <ThemeProvider theme={darkTheme} >
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <div className={IsOpen ? 'add-notes-maincontainer' : 'add-notes-close'}>
                    <div className='cancel-container'>
                        <Tooltip title="Cancel" placement="top" arrow>
                            <HighlightOffRoundedIcon onClick={closeHandler} style={{ cursor: 'pointer' }}></HighlightOffRoundedIcon>
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
                            onClick={() => {
                                setIsOpen(true)
                                console.log('runned')
                            }}
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
                                    {notesType.map((ele, index) => {
                                        // return <MenuItem key={index} value={ele.value}>{ele.value}</MenuItem>
                                        return <MenuItem key={index} value={ele.value}>
                                            <ListItemIcon>
                                                <CircleIcon style={{ color: `${ele.color}` }} />
                                            </ListItemIcon>
                                            <ListItemText>{ele.value}</ListItemText>
                                        </MenuItem>
                                    })}
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

export default NoteCard