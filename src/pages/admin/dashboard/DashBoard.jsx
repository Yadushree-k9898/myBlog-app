import React, { useContext, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog, deleteBlogs } = context;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("admin");
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Ink & Reverie
            </h1>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              yadushreek123@gmail.com
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              <span>Total Blogs: </span> {getAllBlog.length}
            </h2>
            <div className="flex gap-2 mt-2">
              <Link to={"/createblog"}>
                <Button
                  style={{
                    background:
                      mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                    color: mode === "dark" ? "black" : "white",
                  }}
                  className="px-8 py-2"
                >
                  Create Blog
                </Button>
              </Link>
              <Button
                onClick={logout}
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color: mode === "dark" ? "black" : "white",
                }}
                className="px-8 py-2"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Line  */}
        <hr className={`border-2 ${mode === "dark" ? "border-gray-300" : "border-gray-400"}`} />

        {/* Table  */}
        <div className="container mx-auto px-4 max-w-7xl my-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
            {/* Table */}
            <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
              {/* Table head */}
              <thead
                style={{ background: mode === "dark" ? "white" : "rgb(30, 41, 59)" }}
                className="text-xs"
              >
                <tr>
                  <th
                    style={{ color: mode === "dark" ? "rgb(30, 41, 59)" : "white" }}
                    scope="col"
                    className="px-6 py-3"
                  >
                    S.No
                  </th>
                  <th
                    style={{ color: mode === "dark" ? "rgb(30, 41, 59)" : "white" }}
                    scope="col"
                    className="px-6 py-3"
                  >
                    Title
                  </th>
                  <th
                    style={{ color: mode === "dark" ? "rgb(30, 41, 59)" : "white" }}
                    scope="col"
                    className="px-6 py-3"
                  >
                    Category
                  </th>
                  <th
                    style={{ color: mode === "dark" ? "rgb(30, 41, 59)" : "white" }}
                    scope="col"
                    className="px-6 py-3"
                  >
                    Date
                  </th>
                  <th
                    style={{ color: mode === "dark" ? "rgb(30, 41, 59)" : "white" }}
                    scope="col"
                    className="px-6 py-3"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table body */}
              {getAllBlog.length > 0 ? (
                <tbody>
                  {getAllBlog.map((item, index) => {
                    const { id, title, category, time } = item;
                    const formattedDate = time?.seconds
                      ? new Date(time.seconds * 1000).toLocaleString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        })
                      : "Invalid Date";

                    return (
                      <tr
                        key={index}
                        className="border-b-2"
                        style={{ background: mode === "dark" ? "rgb(30, 41, 59)" : "white" }}
                      >
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {index + 1}.
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {title}
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {category}
                        </td>
                        <td
                          style={{ color: mode === "dark" ? "white" : "black" }}
                          className="px-6 py-4"
                        >
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteBlogs(id)}
                            className="px-4 py-1 rounded-lg text-white font-bold bg-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No blogs found
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
