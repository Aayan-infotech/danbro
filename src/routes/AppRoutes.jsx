import { Routes, Route } from "react-router-dom";
import Home from "../layouts/MainLayout";
import { AboutUs } from "../pages/home/AboutUs";
import { Blog } from "../pages/home/Blog";
import { Contact } from "../pages/home/Contact";
import { PressandMedia } from "../pages/home/PressandMedia";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press-media" element={<PressandMedia />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
