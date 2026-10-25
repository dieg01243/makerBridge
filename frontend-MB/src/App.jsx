import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import BenchyWidget from "./components/common/BenchyWidget";
import Login from "./features/home/components/Login";
import DashboardAdmin from "./features/home/components/dashboardAdmin";
import ComoFuncionaLanding from "./features/home/components/ComoFuncionLanding";

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
        <Route path="/ComoFuncionaLanding" element={<ComoFuncionaLanding />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
