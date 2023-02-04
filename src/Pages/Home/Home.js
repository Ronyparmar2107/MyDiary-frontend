import React, { useEffect, useState } from 'react'
import AddNoteCard from '../../Components/NoteCard/AddNote/AddNoteCard'
import NoteCard from '../../Components/NoteCard/ShowNoteCard/NoteCard'

import './Home.css'

const Home = () => {

    const [user, setUser] = useState({})
    const [Notes, setNotes] = useState([])

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
                setNotes(NotesData.notes)
            }
        }

        fetchData()
    }, [authtoken])


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

        console.log(NewData.note)
        setNotes(NewData.note)
    }



    //To Edit a note
    const editHandler = (id, Title, Description, Tag, isBookmark, Color) => {
        let NewNotes = [...Notes]
        NewNotes.map(ele => {
            if (ele.id === id) {
                ele.title = Title
                ele.description = Description
                ele.tag = Tag
                ele.isBookmark = isBookmark
                ele.Color = Color
            }
            return (0)
        })
        setNotes(NewNotes)
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

        setNotes(NewData.note)

    }

    //To bookmark a note
    const bookmarkHandler = () => {
        console.log('bookmark')

    }

    return (
        <div className='home-maincontainer'>
            <div className='add-note-container'>
                <AddNoteCard />
            </div>
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
