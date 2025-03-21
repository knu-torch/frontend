import { Route, Routes } from "react-router-dom";
import ResultPage from "./pages/result";
import MainPage from "./pages/main";

const Router = () => {
    return (
        <Routes>
            <Route path={"/"} element={<MainPage />} />
            <Route path={"/:requestId/result"} element={<ResultPage />} />
        </Routes>
    );
};

export default Router;
