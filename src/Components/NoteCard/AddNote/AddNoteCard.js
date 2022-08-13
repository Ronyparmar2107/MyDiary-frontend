import React, { useState } from 'react'
import { Input, MenuItem, InputLabel, Box, FormControl, Select } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import './AddNoteCard.css'

const NoteCard = () => {
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [IsOpen, setIsOpen] = useState(false)
    const [tag, setTag] = React.useState('');
    const [IsValid, setIsValid] = useState(false)
    const [open, setOpen] = React.useState(true);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const closeHandler = () => {
        setIsOpen(false)
    }
    const checkHandler = () => {
        if (Title.length > 3 || Description.length > 5) {
            if (tag === '') { setTag('General') }
            console.log(Title, Description, tag)
            setIsOpen(false)
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
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <div className={IsOpen ? 'add-notes-maincontainer' : 'add-notes-close'}>
                    <div className='cancel-container'>
                        <HighlightOffRoundedIcon onClick={closeHandler} style={{ cursor: 'pointer' }}></HighlightOffRoundedIcon>
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
                            style={{ color: 'white' }}
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
                                    <MenuItem value={'General'}>General</MenuItem>
                                    <MenuItem value={'Personal'}>Personal</MenuItem>
                                    <MenuItem value={'To-Do'}>To-Do</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    {Title !== '' && Description !== '' && <div className='save-container'>
                        <CheckCircleOutlineRoundedIcon onClick={checkHandler} style={{ cursor: 'pointer', fontSize: '40px' }}></CheckCircleOutlineRoundedIcon>
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