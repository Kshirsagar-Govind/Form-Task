import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import editLogo from "./Assets/edit-logo.svg";
import tickLogo from "./Assets/tick-logo.svg";
import trashLogo from "./Assets/trash-logo.svg";

export default function EditFormPage() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.id);
    getSingleFormData(params.id);
  }, []);

  const [ title, _setTitle ] = useState("edit form title");
  const [ input_title, _setInputTitle ] = useState("input title");
  const [ input_paceholder, _setPlaceholder ] = useState(
    "edit form placeholdere"
  );
  const [ input_type, _setInputType ] = useState(null);
  const [ title_input, _setTitleInput ] = useState(false);
  const [ input_edit, _setInputEdit ] = useState(false);

  const [ input_id_edit, _setInputIdEdit ] = useState(null);
  const [ input_title_edit, _setInputTitleEdit ] = useState("input title");
  const [ placeholder_edit, _setPlaceholderEdit ] = useState(
    "edit form placeholdere"
  );
  const [ input_type_edit, _setInputTypeEdit ] = useState("text");

  const [ newInputArray, _setNewInputArray ] = useState([]);

  const getSingleFormData = async id => {
    try {
      const form = await axios.get(
        `${process.env.REACT_APP_HOST}/get-single-form/${id}`
      );
      console.log(form.data.data[0]);

      _setNewInputArray(form.data.data[0].inputs);
      _setInputTitle(form.data.data[0].form_title);
    } catch (error) {
      console.log(error);
    }
  };

  const editTitle = value => {
    try {
      _setTitle(value);

      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewInput = () => {
    if (newInputArray.length == 20) {
      return alert("Limit exceeded. Can add only 20 inputs.");
    } else if (!input_type) {
      return alert("Select Input type");
    }
    console.log(input_paceholder, input_type, input_title);
    const id = Date.now();
    const new_input_obj = {
      input_paceholder,
      input_type,
      input_title,
      id,
    };
    _setNewInputArray([ ...newInputArray, new_input_obj ]);
  };

  const deleteInput = val => {
    const filtered_arr = newInputArray.filter(input => input.id !== val);
    _setNewInputArray(filtered_arr);
  };

  const submitForm = async () => {
    if (!title) {
      return alert("Enter form title");
    }
    const payload = {
      form_title: title,
      inputs: newInputArray,
    };
    console.log(payload);
    try {
      const newForm = await axios.patch(
        `${process.env.REACT_APP_HOST}/update-form/${params.id}`,
        payload
      );
      if (newForm.data.code == 200) {
        alert("New Form Changes Saved Successfully");
        navigate("/");
      } else {
        alert("SERVER ERROR");
      }
      console.log(newForm);
    } catch (error) {
      console.log(error);
    }
  };

  const editElement = id => {
    try {
      _setInputEdit(true);
      const found = newInputArray.find(item => item.id == id);
      _setInputIdEdit(id);
      _setInputTitleEdit(found.input_title);
      _setPlaceholderEdit(found.placeholder);
      _setInputTypeEdit(found.input_type);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditForm = id => {
    const objIndex = newInputArray.findIndex(obj => obj.id == id);
    newInputArray[objIndex].placeholder = placeholder_edit;
    newInputArray[objIndex].input_type = input_type_edit;
    newInputArray[objIndex].input_title = input_title_edit;
    _setInputEdit(false);
  };
  return (
    <div className="home-page">
      <div className="jumbotron">
        <h1 class="display-5 px-5">Edit Form</h1>
      </div>
      <div className="add-form-page">
        <div className="form-section">
          <div className="form-heading just-center">
            {title_input ? (
              <div className="just-align">
                <input
                  type="text"
                  className="input-class"
                  placeholder="enter form title"
                  onChange={e => editTitle(e.target.value)}
                />
                <button
                  className="btn btn-outline-success mx-3"
                  onClick={() => _setTitleInput(false)}
                >
                  <img className="pointer" src={tickLogo} alt="" />
                </button>
              </div>
            ) : (
              <div className="just-align">
                <h2>{title}</h2>
                <button
                  className="btn btn-outline-warning mx-3"
                  onClick={() => _setTitleInput(true)}
                >
                  <img className="pointer" src={editLogo} alt="" />
                </button>
              </div>
            )}
          </div>
          <div className="form-wrapper">
            <div className="form-style" id="my-form">
              {newInputArray.map(item => (
                <div className="input-div">
                  <label className="input-label" htmlFor="">
                    {item.input_title}
                  </label>
                  <input
                    className="input-class"
                    readOnly="true"
                    placeholder={item.input_paceholder}
                    type={item.input_type}
                  />
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => editElement(item.id)}
                  >
                    <img src={editLogo} alt="" />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteInput(item.id)}
                  >
                    <img src={trashLogo} alt="" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-utility">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Select input type
              </label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              onChange={e => _setInputType(e.target.value)}
            >
              <option selected>Choose...</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="">
                Input Title
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="enter input title"
              onChange={e => _setInputTitle(e.target.value)}
            />
          </div>{" "}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="">
                Input Placeholder
              </span>
            </div>
            <input
              type="text"
              placeholder="enter input placeholder"
              class="form-control"
              onChange={e => _setPlaceholder(e.target.value)}
            />
          </div>
          <div className="just-space ">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => addNewInput()}
            >
              Add Input
            </button>{" "}
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={() => submitForm()}
            >
              Save Form
            </button>{" "}
          </div>
        </div>
        {input_edit ? (
          <div className="dark-back just-center">
            <div className="edit-input-form">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Select input type
                  </label>
                </div>
                <select
                  class="custom-select"
                  id="inputGroupSelect01"
                  onChange={e => _setInputTypeEdit(e.target.value)}
                >
                  <option selected>{input_type_edit}</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                  <option value="number">Number</option>
                  <option value="text">Text</option>
                </select>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">
                    New Input Title
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder={input_title_edit}
                  onChange={e => _setInputTitleEdit(e.target.value)}
                />
              </div>{" "}
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="">
                    New Placeholder
                  </span>
                </div>
                <input
                  placeholder={placeholder_edit}
                  type="text"
                  class="form-control"
                  onChange={e => _setPlaceholderEdit(e.target.value)}
                />
              </div>
              <div className="just-space mt-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => saveEditForm(input_id_edit)}
                >
                  Save
                </button>{" "}
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  onClick={() => _setInputEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="floating-div-2">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
