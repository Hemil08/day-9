import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [notes,setNotes] = useState([])

  function fetchNotes(){
    axios.get('https://cohort-2-0-1moi.onrender.com/api/notes')
    .then((res)=>{
      setNotes(res.data.notes)
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])
  
  function handleSubmit(e){
    e.preventDefault()

    const {title,description} = e.target.elements

    axios.post("https://cohort-2-0-1moi.onrender.com/api/notes",{
      title: title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data)

      fetchNotes()
    })

  }
  
  function handleDeleteNote(noteId){
    axios.delete("https://cohort-2-0-1moi.onrender.com/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleUpdateNote(noteId){
    // axios.patch("https://cohort-2-0-1moi.onrender.com/api/notes/"+noteId)
    console.log("update")
  }

  return (
    <>

    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter Title' />
      <input name='description' type="text" placeholder='Enter Description' />
      <button> Create Note</button>
    </form>

    <div className='notes'>
      {
        notes.map((note,index)=>{
          return <div className='note' key={index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <div className='buttons'> 
              <button className='button' onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
              <button className='button' onClick={()=>{handleUpdateNote(note._id)}}>Edit</button>
            </div>
          </div>
        })
      }
      
    </div>
    </>
  )
}

export default App