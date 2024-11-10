import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/NoPage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import DashBoard from "./pages/admin/dashboard/DashBoard";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import MyState from "./context/data/myState";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <MyState>
        <Router future={{v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/allblogs" element={<AllBlogs />} />
            <Route path="/bloginfo/:id" element={<BlogInfo />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route
              path="/createblog"
              element={
                <ProtectedRouteForAdmin>
                  <CreateBlog />
                </ProtectedRouteForAdmin>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteForAdmin>
                  <DashBoard />
                </ProtectedRouteForAdmin>
              }
            />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <Toaster />
        </Router>
      </MyState>
    </div>
  );
}

export default App;

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  // Check if the admin email matches
  if (admin?.user?.email === "yadu123@gmail.com") {
    return children;
  } else {
    // Redirect to login if not authorized
    return <Navigate to="/adminlogin" />;
  }
};
