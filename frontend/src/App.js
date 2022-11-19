import NewFormPage from "./Components/create-form-page";
import './Components/CSS/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import HomwPage from "./Components/home-page";
import EditFormPage from "./Components/edit-form-page";
import ViewFormPage from "./Components/view-form-page";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomwPage />}></Route>
          <Route path="/form/create" element={<NewFormPage />}></Route>
          <Route path="/form/:id/edit" element={<EditFormPage />}></Route>
          <Route path="/form/:id" element={<ViewFormPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
