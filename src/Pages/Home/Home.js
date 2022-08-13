import React from 'react'
import AddNoteCard from '../../Components/NoteCard/AddNote/AddNoteCard'
import NoteCard from '../../Components/NoteCard/ShowNoteCard/NoteCard'
import './Home.css'

const Home = () => {
    return (
        <div className='home-maincontainer'>
            <div className='add-note-container'>
                <AddNoteCard />
            </div>
            <div className='show-notes-maincontainer'>
                <h2>Your-Diary-Notes</h2>
                <div className='show-notes-container'>
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                </div>
            </div>
        </div>
    )
}

export default Home
