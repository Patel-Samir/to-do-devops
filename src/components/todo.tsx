import React, { useState } from "react";
import "./todo.css";

export function ToDoApp() {
  const [list, setInputValue] = useState<string[]>([]);
  const [val, changeV] = useState<string>("");
  const [valUpdate, updateV] = useState<number>(-1);
  const [editVal, changeE] = useState<string>("");
  const [items, setItems] = useState<number[]>([-1]);

  const handleCheckboxChange = (index: number) => {
    if (items.includes(index)) {
      setItems(items.filter((itemIndex) => itemIndex !== index));
    } else {
      setItems([...items, index]);
    }
  };

  function insertToDo() {
    if (val.length > 0) {
      setInputValue([...list, val]);
      changeV("");
    } else alert("You can not add empty todo");
  }

  function handleChange(e: any) {
    changeV(e.target.value);
  }

  function handleChangeE(e: any) {
    changeE(e.target.value);
  }

  function deleteToDo(selectedIndex: number) {
    let newArray = [...list];
    newArray.splice(selectedIndex, 1);
    setInputValue([...newArray]);
  }

  function updateValue(indexToBeUpdate: number, val: string) {
    changeE(val);
    updateV(indexToBeUpdate);
  }

  function handleEdit(index: number) {
    const newArray = [...list];
    newArray.splice(index, 1, editVal);
    setInputValue(newArray);
    updateV(-1);
    changeE("");
  }

  return (
    <div className="todo-root">
      <div className="input-todo">
        <input
          type="text"
          name="inputToDo"
          id="inputBoxToDo"
          value={val}
          onChange={handleChange}
        />
        <button onClick={insertToDo} id="addItemButton">
          Add Item
        </button>
      </div>
      <div className="todo-list">
        {list.map((e, index: number) => (
          <div key={index}>
            {valUpdate === index ? (
              <div>
                <input
                  type="text"
                  name="editToDO"
                  id="inputBoxToDo"
                  value={editVal}
                  onChange={handleChangeE}
                />
                <button
                  onClick={() => handleEdit(index)}
                  className="editItemButton"
                >
                  Edit Item
                </button>
              </div>
            ) : (
              <div
                className={`update-todo ${
                  items.includes(index) ? "completed" : ""
                }`}
              >
                <span>
                  <input
                    type="checkbox"
                    name="taskComplete"
                    id="taskComplete"
                    checked={items.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </span>
                <span className="list">{e}</span>
                <span onClick={() => updateValue(index, editVal)}>
                  <img
                    alt="edit"
                    className="edit-icon"
                    src={require("../components/assets/edit.png")}
                  ></img>
                </span>
                <span onClick={() => deleteToDo(index)}>
                  <img
                    alt="delete"
                    className="delete-icon"
                    src={require("../components/assets/delete.png")}
                  ></img>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
