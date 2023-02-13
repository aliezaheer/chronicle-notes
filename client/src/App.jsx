import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import DataProvider from "./context/DataProvider";

// components
import Login from "./components/Login";
import HomePage from "./components/HomePage";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
