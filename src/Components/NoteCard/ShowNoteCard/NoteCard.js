import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import Tooltip from '@mui/material/Tooltip';

import './NoteCard.css'

const NoteCard = (props) => {
    const [inFocus, setinFocus] = useState(false)
    const [colourPallate, setColourPallate] = useState(false)


    const colours = [
        '',
        '#8896ab',
        '#935fa7',
        '#d64933',
        '#7f7979',
        '#b39c4d',
        '#2f9c95',
        '#607744'
    ]

    //Added for material ui components
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const colourPallateHandler = (ele) => {
        props.changeBg(props.id, ele)
    }

    return (
        <ThemeProvider theme={darkTheme} >
            {inFocus && <div className='backdrop' onClick={() => { setinFocus(false) }}></div>}



            <div className={!inFocus ? 'notes-maincontainer' : 'onFocus-container'} style={{ backgroundColor: props.Color }}>
                <div className='bookmark-container'>
                    <Tooltip title="Bookmark" placement="top" arrow>
                        <IconButton className='bookmark-button' onClick={props.bookmark}>
                            <BookmarkBorderOutlinedIcon style={{ fontSize: 23 }}></BookmarkBorderOutlinedIcon>
                        </IconButton>
                    </Tooltip>
                </div>


                <div onClick={() => { setinFocus(!inFocus) }}>
                    <div className='notes-title'>
                        <h4>{props.Title}</h4>
                    </div>
                    <div className='notes-description'>
                        {!inFocus && <p>{props.Description.lenght <= 50 ? props.Description : props.Description.slice(0, 47) + '...'}</p>}
                        {inFocus && <p>{props.Description}</p>}
                    </div>
                </div>
                <div style={{ height: '1.5vh' }}></div>


                <div className='other-options-container' >

                    <Tooltip title="Delete" placement="bottom" arrow>
                        <IconButton className='delete-button' >
                            <DeleteOutlineOutlinedIcon style={{ fontSize: 23 }} onClick={() => props.delete(props.id)}></DeleteOutlineOutlinedIcon>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit" placement="bottom" arrow>
                        <IconButton className='edit-button' onClick={props.edit}>
                            <CreateOutlinedIcon style={{ fontSize: 23 }}></CreateOutlinedIcon>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Background Colour" placement="bottom" arrow>
                        <IconButton className='bgColour-button' onClick={() => { setColourPallate(!colourPallate) }}>
                            <ColorLensOutlinedIcon style={{ fontSize: 23 }}></ColorLensOutlinedIcon>
                        </IconButton>
                    </Tooltip>
                </div>
                {colourPallate &&
                    <div className='colourPallate' onBlur={() => setColourPallate(false)}>
                        {colours.map(ele => {
                            return (
                                <div className='colour'
                                    style={{ backgroundColor: `${ele}` }}
                                    key={colours.indexOf(ele)}
                                    onClick={() => {
                                        colourPallateHandler(ele)
                                    }} />
                            )
                        })}
                    </div>}

            </div>


        </ThemeProvider>
    )
}

export default NoteCard