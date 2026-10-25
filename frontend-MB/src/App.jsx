import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import BenchyWidget from "./components/common/BenchyWidget";
import Login from "./features/home/components/Login";
import DashboardAdmin from "./features/home/components/dashboardAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <BenchyWidget />
            </>
          }
        />

        <Route path="/Login" element={<Login />} />

        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
