import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import { axiosWithAuth } from "../utils/auth";
const initialColor = {
  color: "",
  code: { hex: "" }
};
const ColorList = ({ colors, updateColors }) => {
  const {push} = useHistory();
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  });
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors([
          ...colors.filter(color => color.id !== colorToEdit.id),
          res.data,
        ]);
        setEditing(false);
      })
      .catch(err => console.log(err));
      window.location.reload();
  };
  const deleteColor = (id, e, color) => {
    if (window.confirm("Are you sure you want to delete this color?")) {
      updateColors(colors.filter(color => color.id !== id));
      axiosWithAuth()
        .delete(`/api/colors/${id}`)
        .then(res => {
          console.log(`Color with ID: ${id}, was deleted`);
        })
        .catch(err => {
         console.log(err)
        });
    }
  };
  const handleNewColor = (e) => {
    e.preventDefault()
    axiosWithAuth().post('/api/colors', newColor)
      .then(res => {
        updateColors(res.data)
        console.log(newColor)
      })
      .catch(err => {
     console.log(err)
      })
      push('/bubbles')
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  deleteColor(color.id);
                }}
              >
                x
              </span>
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing ? (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      ) : (
      <form onSubmit={handleNewColor}>
        <label>
          color name:
            <input
            onChange={e =>
              setNewColor({ ...newColor, color: e.target.value })
            }
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
            <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              })
            }
            value={newColor.code.hex}
          />
        </label> 
        <button onClick={() => setNewColor } type='submit'>Add Color</button>
      </form>)}
    </div>
  );
};
export default ColorList;

