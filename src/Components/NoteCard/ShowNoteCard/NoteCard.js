import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';

import './NoteCard.css'
import EditNoteCard from '../EditNote/EditNoteCard';

const NoteCard = (props) => {
    const [inFocus, setinFocus] = useState(false)
    const [EditMode, setEditMode] = useState(false)

    //Added for material ui components
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const editModeHandler = () => {
        setEditMode(true)
    }

    const colourPallateHandler = (ele) => {
        props.changeBg(props.id, ele)
        console.log(props.id, ele)
    }

    return (
        <>
            {EditMode && <EditNoteCard
                Title={props.Title}
                Description={props.Description}
                Tag={props.Tag}
                Close={() => { setEditMode(false) }}
                Edit={(Title, Description, Tag) => { props.update(props.id, Title, Description, Tag) }} />}

            <ThemeProvider theme={darkTheme} >

                {inFocus || EditMode ? <div className='backdrop' onClick={() => { setinFocus(false) }}></div> : null}


                <div className='notes-maincontainer' style={{ backgroundColor: props.Color }}>
                    <div className='bookmark-container' style={{ display: props.isBookmark ? 'flex' : 'none' }}>
                        <Tooltip title="Bookmark" placement="top" arrow>
                            <IconButton className='bookmark-button' onClick={() => props.bookmark(props.id)}>
                                {/* <BookmarkIcon style={{ fontSize: 23 }}></BookmarkIcon> */}
                                {
                                    props.isBookmark ? <BookmarkIcon style={{ fontSize: 23 }}></BookmarkIcon>
                                        : <BookmarkBorderOutlinedIcon style={{ fontSize: 23 }}></BookmarkBorderOutlinedIcon>

                                }

                            </IconButton>
                        </Tooltip>
                    </div>


                    <div onClick={() => { setinFocus(!inFocus) }}>
                        <div className='notes-title'>
                            <h4>{props.Title}</h4>
                        </div>
                        <div className='notes-description'>
                            {!inFocus && <p>{props.Description.length <= 50 ? props.Description : (props.Description.slice(0, 47) + '...')}</p>}
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
                            <IconButton className='edit-button' onClick={editModeHandler}>
                                <CreateOutlinedIcon style={{ fontSize: 23 }}></CreateOutlinedIcon>
                            </IconButton>
                        </Tooltip>
                    </div>

                </div>


            </ThemeProvider>
            <Drawer anchor='right' open={inFocus} onClose={() => setinFocus(false)}>
                <div className='drawer-container'>
                    <div className='drawer-title'>
                        <h4>{props.Title}</h4>
                    </div>
                    <div className='drawer-description'>
                        {props.Description}
                    </div>
                    <div className='drawer-dates'>
                        Last Edited : {props.editedDate}
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default NoteCard