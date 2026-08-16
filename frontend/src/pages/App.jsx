import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AddDisaster from "./AddDisaster";
import AddVolunteer from "./AddVolunteer";
import Volunteers from "./Volunteers";
import ReliefCamps from "./ReliefCamps";
import AddReliefCamp from "./AddReliefCamp";
import Resources from "./Resources";
import AddResource from "./AddResource";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import Notifications from "./Notifications";
import AddNotification from "./AddNotification";

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
        <Route path="/relief-camps" element={<ReliefCamps />} />
        <Route path="/add-relief-camp" element={<AddReliefCamp />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/add-resource" element={<AddResource />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/add-notification" element={<AddNotification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;