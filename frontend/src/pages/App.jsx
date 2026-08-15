import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AddDisaster from "./AddDisaster";
import AddVolunteer from "./AddVolunteer";
import Volunteers from "./Volunteers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-disaster" element={<AddDisaster />} />
        <Route path="/add-volunteer" element={<AddVolunteer />} />
        <Route path="/volunteers" element={<Volunteers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;