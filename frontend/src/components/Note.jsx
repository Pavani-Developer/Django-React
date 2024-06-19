import React, { useState } from "react";
import "../styles/Note.css"

function Note({ note, onDelete, onEdit }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(note.id, { title: editedTitle, content: editedContent });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTitle(note.title);
        setEditedContent(note.content);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setEditedTitle(value);
        } else if (name === "content") {
            setEditedContent(value);
        }
    };

    return (
        <div className="note-container">
            {isEditing ? (
                <div className="edit-note">
                    <label>Title</label>
                    <input
                        id = 'edit-input'
                        type="text"
                        name="title"
                        value={editedTitle}
                        onChange={handleChange}
                    />
                    <label>Content</label>
                    <textarea
                        id = 'edit-text'
                        name="content"
                        value={editedContent}
                        onChange={handleChange}
                    />
                    <button id = 'save-btn' onClick={handleSave}>Save</button>
                    <button id = 'cancel-btn' onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p className="note-title">{note.title}</p>
                    <p className="note-content">{note.content}</p>
                    <p className="note-date">{formattedDate}</p>
                    <button className="delete-button" onClick={() => onDelete(note.id)}>
                        Delete
                    </button>
                    <button className="edit-button" onClick={handleEdit}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
}

export default Note;
