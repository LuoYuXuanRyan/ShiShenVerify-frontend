import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login/Login";
import TheLayout from "./layout/TheLayout";
import FirstIdentification from "./first_identification/FirstIdentification";
import SecondIdentification from "./second_identification/SecondIdentification";
import Database from "./database/Database";
import Monitor from "./monitor/Monitor";
import DataEntry from "./data_entry/DataEntry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TheLayout />}>
          <Route
            index
            path="first_identification"
            element={<FirstIdentification />}
          />
          <Route
            path="second_identification"
            element={<SecondIdentification />}
          />
          <Route path="database" element={<Database />} />
          <Route path="monitor" element={<Monitor />} />
          <Route path="data_entry" element={<DataEntry />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
