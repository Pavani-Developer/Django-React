import React, { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home({log}) {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => console.log(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    console.log("Note deleted!");
                    getNotes(); // Refresh notes after deletion
                } else {
                    console.log("Failed to delete note.");
                }
            })
            .catch((error) => console.log(error));
    };

    const updateNote = (id, updatedNote) => {
        api
            .put(`/api/notes/update/${id}/`, updatedNote)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Note Updated!");
                    getNotes(); // Refresh notes after update
                } else {
                    console.log("Failed to update note.");
                }
            })
            .catch((error) => console.log(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    // alert("Note created!");
                    setTitle('');  
                    setContent(''); 
                    getNotes();
                } else {
                    console.log("Failed to make note.");
                }
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className="home-container">
            <div className="header">
                <h2>Notes</h2>
                <Link to='logout/' ><button className="logout-button" onClick={log}>
                    Logout
                </button></Link>
            </div>
            <div>
                {notes.map((note) => (
                    <Note
                        note={note}
                        onDelete={deleteNote}
                        onEdit={updateNote} 
                        key={note.id}
                    />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
