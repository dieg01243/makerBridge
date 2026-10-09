import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import BenchyWidget from "./components/common/BenchyWidget";
import Login from "../src/features/home/components/Login";

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
      </Routes>
    </BrowserRouter>
  );
}
