import React, { useEffect, useState } from 'react'
import AddNoteCard from '../../Components/NoteCard/AddNote/AddNoteCard'
import NoteCard from '../../Components/NoteCard/ShowNoteCard/NoteCard'

import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


import './Home.css'

const Home = (props) => {

    const [user, setUser] = useState({})
    const [Notes, setNotes] = useState([])
    const [logoutbox, setLogoutbox] = useState(false)

    const authtoken = localStorage.getItem('authtoken')

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch('http://localhost:3001/api/auth/getuser', {
                method: 'POST',
                headers: {
                    "auth-token": authtoken.toString()
                }
            })
            let data = await response.json()
            setUser(data.data.user)

            if (data.success) {
                const response = await fetch('http://localhost:3001/api/note/fetchallnotes', {
                    method: 'GET',
                    headers: {
                        "auth-token": authtoken.toString()
                    }
                })
                let NotesData = await response.json()
                let sortedNotes = sortForBookmark(NotesData.notes)
                setNotes(sortedNotes)
            }
        }

        fetchData()
    }, [authtoken])


    const handleLogoutOpen = () => setLogoutbox(true);

    const handleLogoutClose = (condition) => {
        if (condition) {
            props.Logout()
        }
        setLogoutbox(false);
    };




    const newNoteAdded = async () => {
        const response = await fetch('http://localhost:3001/api/note/fetchallnotes', {
            method: 'GET',
            headers: {
                "auth-token": authtoken.toString()
            }
        })
        let NotesData = await response.json()
        // console.log(NotesData)
        let sortedNotes = sortForBookmark(NotesData.notes)
        setNotes(sortedNotes)
    }

    //To delete a note
    const deleteHandler = async (id) => {
        // let NewNotes = [...Notes]
        // let index = NewNotes.findIndex(ele => ele._id === id)
        // console.log(index)
        // NewNotes.splice(index, 1)

        let deleteNote = {
            id: id,
            userId: user._id
        }

        const response = await fetch('http://localhost:3001/api/note/deletenote', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken.toString()
            },
            body: JSON.stringify(deleteNote)
        })
        let NewData = await response.json()


        let sortedNotes = sortForBookmark(NewData.note)
        setNotes(sortedNotes)
    }

    //To Edit a note
    const editHandler = async (id, Title, Description, Tag, isBookmark, Color) => {

        let sentdata = {
            userId: user._id,
            id: id,
            title: Title,
            description: Description,
            tag: Tag,
            isBookmark: isBookmark,
            backgroundColour: Color
        }

        const response = await fetch('http://localhost:3001/api/note/updatenote', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken.toString()
            },
            body: JSON.stringify(sentdata)
        })

        let NewData = await response.json()


        let sortedNotes = sortForBookmark(NewData.note)
        setNotes(sortedNotes)
    }

    //To change background colour of a note
    const colorHandler = async (id, colour) => {

        let Note = Notes.find(ele => ele._id === id)

        let sentdata = {
            userId: user._id,
            id: id,
            title: Note.title,
            description: Note.description,
            tag: Note.tag,
            isBookmark: false,
            backgroundColour: colour
        }

        const response = await fetch('http://localhost:3001/api/note/updatenote', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken.toString()
            },
            body: JSON.stringify(sentdata)
        })

        let NewData = await response.json()


        let sortedNotes = sortForBookmark(NewData.note)
        setNotes(sortedNotes)

    }

    //To bookmark a note
    const bookmarkHandler = async (id) => {
        console.log('bookmark')
        console.log(id)
        let note = Notes.find(ele => ele._id === id)
        let updatedNote = note
        updatedNote.isBookmark = !note.isBookmark
        updatedNote.userId = user._id
        updatedNote.id = note._id


        console.log(updatedNote)

        const response = await fetch('http://localhost:3001/api/note/updatenote', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken.toString()
            },
            body: JSON.stringify(updatedNote)
        })

        let NewData = await response.json()

        let sortedNotes = sortForBookmark(NewData.note)
        setNotes(sortedNotes)
    }

    const sortForBookmark = (notes) => {
        let bookmarkedNotes = notes.filter(ele => ele.isBookmark === true)
        let unbookmarkedNotes = notes.filter(ele => ele.isBookmark === false)
        return ([...bookmarkedNotes, ...unbookmarkedNotes])
    }



    return (
        <div className='home-maincontainer'>
            <div className='add-note-container'>
                <AddNoteCard newNoteAdded={newNoteAdded} />
            </div>
            <div className='logout-container'>

                <Button variant="outlined" onClick={handleLogoutOpen} endIcon={<LogoutIcon />} color='secondary'>
                    Logout
                </Button>
            </div>

            <Dialog
                open={logoutbox}
                onClose={() => handleLogoutClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Do you want to Logout?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleLogoutClose(false)}>Disagree</Button>
                    <Button onClick={() => handleLogoutClose(true)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <div className='show-notes-maincontainer'>
                <h2>Your-Diary-Notes</h2>
                <div className='show-notes-container'>
                    {Notes.map(ele => {
                        return (
                            <NoteCard key={ele.id}
                                id={ele._id}
                                Title={ele.title}
                                Description={ele.description}
                                Tag={ele.tag}
                                isBookmark={ele.isBookmark}
                                Color={ele.backgroundColour}
                                delete={deleteHandler}
                                update={editHandler}
                                bookmark={bookmarkHandler}
                                changeBg={colorHandler} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
