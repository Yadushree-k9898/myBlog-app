import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";

function AllBlogs() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(getAllBlog);
  }, [getAllBlog]);

  const textColor = mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)";
  const backgroundColor = mode === "dark" ? "rgb(30, 41, 59)" : "white";

  const handleCardClick = (id) => {
    navigate(`/bloginfo/${id}`);
  };

  const blogs = Array.isArray(getAllBlog) ? getAllBlog : []; // Ensure getAllBlog is always an array

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <section className="text-gray-600 body-font flex-grow">
          <div className="container px-5 py-10 mx-auto max-w-7xl">
            <div className="mb-5">
              <h1 className="text-center text-2xl font-bold" style={{ color: textColor }}>
                All Blogs
              </h1>
            </div>

            <div className="flex flex-wrap justify-center -m-4 mb-5">
              {blogs.length > 0 ? (
                blogs.map((item) => {
                  const { date, id, title } = item;

                  return (
                    <div key={id} className="p-4 md:w-1/3" onClick={() => handleCardClick(id)}>
                      <div
                        style={{ background: backgroundColor }}
                        className="h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 rounded-xl overflow-hidden"
                      >
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: textColor }}>
                            {date}
                          </h2>
                          <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{ color: textColor }}>
                            {title}
                          </h1>
                          <p className="leading-relaxed mb-3" style={{ color: textColor }}>
                            Ziro Valley, with its lush greenery and serene landscapes, offers a perfect escape into nature's embrace.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2 className="text-center">No blogs found</h2>
              )}
            </div>
          </div>
        </section>
        <footer className="text-center p-4 bg-gray-200 mt-auto">
          <p>© 2024 All rights reserved</p>
        </footer>
      </div>
    </Layout>
  );
}

export default AllBlogs;
