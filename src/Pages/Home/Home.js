import React, { useEffect, useState } from 'react'
import AddNoteCard from '../../Components/NoteCard/AddNote/AddNoteCard'
import NoteCard from '../../Components/NoteCard/ShowNoteCard/NoteCard'
import Data from '../../DummyData/Data.json'

import './Home.css'

const Home = () => {

    const [Notes, setNotes] = useState([])

    useEffect(() => {
        let FetchedNotes = Data?.notes
        setNotes(FetchedNotes)
    }, [])

    //To delete a note
    const deleteHandler = (id) => {
        let NewNotes = [...Notes]
        let index = NewNotes.findIndex(ele => ele.id === id)
        // console.log(index)
        NewNotes.splice(index, 1)
        setNotes(NewNotes)
    }
    //To Edit a note
    const editHandler = () => {
        console.log('edit')

    }

    //To change background colour of a note
    const colorHandler = (id, colour) => {
        let NewNotes = [...Notes]
        let Note = Notes.find(ele => ele.id === id)
        Note.backgroundColor = colour

        NewNotes.map(ele => {
            if (ele.id === id) {
                ele.backgroundColor = colour
            }
        })

        setNotes(NewNotes)

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
                                id={ele.id}
                                Title={ele.title}
                                Description={ele.description}
                                Tag={ele.tag}
                                isBookmark={ele.isBookmark}
                                Color={ele.backgroundColor}
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
