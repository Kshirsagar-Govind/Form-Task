import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editLogo from "./Assets/edit-logo.svg";
import tickLogo from "./Assets/tick-logo.svg";
import trashLogo from "./Assets/trash-logo.svg";
export default function ViewFormPage() {
  const [ formInputs, _setFormInput ] = useState([]);
  const [ valueInput, _setValueInput ] = useState([]);

  const [ formTitle, _setFormTitle ] = useState("loading...");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getSingleFormData(params.id);
  }, []);
  const getSingleFormData = async id => {
    try {
      const form = await axios.get(
        `${process.env.REACT_APP_HOST}/get-single-form/${id}`
      );
      const temp_arr = [];
      form.data.data[0].inputs.map(item => temp_arr.push(""));
      console.log(form.data.data[0]);
      _setFormInput(form.data.data[0].inputs);
      _setValueInput(temp_arr);
      _setFormTitle(form.data.data[0].form_title);
    } catch (error) {
      console.log(error);
    }
  };
  const submitForm = () => {
    // IN THIS ARRAY WE HAVE VALUES OF INPUT
    console.log(valueInput);
    alert("Form Submitted successfully");
  };
  return (
    <div className="home-page">
      <div className="jumbotron">
        <h1 class="display-5">View Form</h1>
      </div>
      <div className="view-form-div">
        <div className="just-center">
          <h4>{formTitle}</h4>
        </div>
        <div className="form-wrapper">
          <form>
            <div className="form-style">
              {formInputs.map((item, index) => (
                <div className="input-div">
                  <label className="input-label" htmlFor="">
                    {item.input_title}
                  </label>
                  <input
                    onChange={e => {
                      valueInput[index] = valueInput[index] + e.target.value;
                    }}
                    className="input-class"
                    placeholder={item.input_paceholder}
                    type={item.input_type}
                  />
                </div>
              ))}
            </div>
          </form>
          <div className="just-center">
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={() => submitForm()}
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
      <div className="floating-div-2">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
