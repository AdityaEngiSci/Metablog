import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ForgotPasswordStep from "./pages/ForgotPassword/ForgotPasswordStep";
import ForgotPasswordStep1 from "./pages/ForgotPassword/ForgotPasswordStep1";
import ResetPasswordStep from "./pages/ResetPassword/ResetPasswordStep";
import ResetPasswordStep1 from "./pages/ResetPasswordStep1";
import './index.css';
import BlogsListing from "./pages/BlogsListing/BlogsListing";
import BlogPage from "./pages/BlogPage/BlogPage";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserBlogs from "./pages/Blogs/UserBlogs";
import BlogManagement from './pages/AdminPage/BlogManagement';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/forgot-password-step-3":
        title = "";
        metaDescription = "";
        break;
      case "/verify-otp":
        title = "";
        metaDescription = "";
        break;
      case "/reset-password-step-3":
        title = "";
        metaDescription = "";
        break;
      case "/reset-password-step-4":
          title = "";
          metaDescription = "";
        break;

    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password-step-3" element={<ForgotPasswordStep />} />
      <Route path="/verify-otp" element={<ForgotPasswordStep1 />} />
      <Route path="/reset-password-step-3" element={<ResetPasswordStep />} />
      <Route path="/reset-password-step-4" element={<ResetPasswordStep1 />} />
      <Route path="/blogs-listing" element={<BlogsListing />} />
      <Route path="/blog/:blogId" element={<BlogPage />}  />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/user-blogs" element={<UserBlogs />} />
      <Route path="/admin-page" element={<BlogManagement />} />
    </Routes>
  );
}

export default App;
