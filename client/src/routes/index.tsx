import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/auth/signin"} element={<SignIn />} />
        <Route path={"/auth/signup"} element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
