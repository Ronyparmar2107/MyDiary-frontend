import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';

import './NoteCard.css'

const NoteCard = () => {
    const [inFocus, setinFocus] = useState(false)

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            {inFocus && <div className='backdrop' onClick={() => { setinFocus(false) }}></div>}
            <div className={!inFocus ? 'notes-maincontainer' : 'onFocus-container'} onClick={() => { setinFocus(!inFocus) }} >
                <div className='bookmark-container'>
                    <IconButton className='bookmark-button'>
                        <BookmarkBorderOutlinedIcon style={{ fontSize: 23 }}></BookmarkBorderOutlinedIcon>
                    </IconButton>
                </div>
                <div className='notes-title'>
                    <h4>Title</h4>
                </div>
                <div className='notes-description'>
                    <p>This is description</p>
                </div>
                <div className='other-options-container'>
                    <IconButton className='delete-button'>
                        <DeleteOutlineOutlinedIcon style={{ fontSize: 23 }}></DeleteOutlineOutlinedIcon>
                    </IconButton>
                    <IconButton className='edit-button'>
                        <CreateOutlinedIcon style={{ fontSize: 23 }}></CreateOutlinedIcon>
                    </IconButton>
                    <IconButton className='bgColour-button'>
                        <ColorLensOutlinedIcon style={{ fontSize: 23 }}></ColorLensOutlinedIcon>
                    </IconButton>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default NoteCard