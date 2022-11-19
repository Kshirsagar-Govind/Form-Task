import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import addFormLogo from "./Assets/add-form-logo.svg";
export default function HomwPage() {
  const [ forms, _setForms ] = useState([]);
  const [ loading, _setLoading ] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getAllForms();
  }, []);

  const getAllForms = async () => {
    _setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_HOST}/get-all-forms`);

    _setForms(res.data.data);
    _setLoading(false);
  };

  return (
    <div className="home-page">
      <div className="just-center">
        <h1>All Forms</h1>
      </div>

      <br />
      <div className="just-center">
        <div className="table-section">
          <table class="table ">
            <thead class="thead-dark">
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Sr.No
                </th>
                <th scope="col">Form Title</th>
                <th scope="col">Added On</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {loading ? (
              <div className="just-center">
                <h4>Loading....</h4>
              </div>
            ) : (
              <tbody>
                {forms.length > 0 ? (
                  forms.map((item, index) => (
                    <TableRow
                      props={item}
                      no={index + 1}
                      relaod={() => getAllForms()}
                    />
                  ))
                ) : (
                  <p>No Forms Created</p>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div className="floating-div">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/form/create")}
        >
          <img src={addFormLogo} alt="" />
          Add New Form
        </button>
      </div>
    </div>
  );
}

const TableRow = ({ props, relaod, no }) => {
  const navigate = useNavigate();
  useEffect(
    () => {
      console.log(props);
    },
    [ props ]
  );
  const deleteThisForm = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_HOST}/delete-form/${props.form_id}`
    );

    relaod();
  };
  return (
    <tr>
      <th style={{ width: "100px", textAlign: "center" }}>{no}</th>
      <td style={{ width: "500px" }}>{props.form_title}</td>
      <td style={{ width: "300px" }}>{props.date}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/form/${props.form_id}`)}
        >
          View
        </button>
        <button
          className="btn btn-outline-secondary mx-3"
          onClick={() => navigate(`/form/${props.form_id}/edit`)}
        >
          Edit
        </button>
        <button className="btn btn-outline-danger" onClick={deleteThisForm}>
          Delete
        </button>
      </td>
    </tr>
  );
};
