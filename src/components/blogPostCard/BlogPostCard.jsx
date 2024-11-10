import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    if (id) {
      navigate(`/bloginfo/${id}`);
    }
  };

  const blogs = Array.isArray(getAllBlog) ? getAllBlog : [];

  const textColor = mode === "dark" ? "white" : "black";

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {blogs.length > 0 ? (
              blogs.map((item) => {
                const { date, id, title } = item;

                return (
                  <div className="p-4 md:w-1/3" key={id}>
                    <div
                      style={{
                        background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                        borderBottom:
                          mode === "dark"
                            ? "4px solid rgb(226, 232, 240)"
                            : "4px solid rgb(30, 41, 59)",
                      }}
                      className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                        ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"}
                        rounded-xl overflow-hidden`}
                      onClick={() => handleCardClick(id)}
                    >
                      <div className="p-6">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: textColor }}
                        >
                          {date}
                        </h2>
                        <h1
                          className="title-font text-lg font-bold text-gray-900 mb-3"
                          style={{ color: textColor }}
                        >
                          {title}
                        </h1>
                        <p
                          className="leading-relaxed mb-3"
                          style={{ color: textColor }}
                        >
                          Ziro Valley, with its lush greenery and serene
                          landscapes, offers a perfect escape into nature's
                          embrace.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No blogs found</h1>
            )}
          </div>

          {/* See More Button */}
          <div className="flex justify-center my-5">
            <Button
              onClick={() => console.log("See more blogs clicked")}
              style={{
                background: mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              See More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;
