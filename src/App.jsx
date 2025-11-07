import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";
import { Route, Routes } from "react-router";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="second" element={<SecondPage />} />
        <Route path="third" element={<ThirdPage />} />
      </Route>
    </Routes>
  );
}

export default App;
