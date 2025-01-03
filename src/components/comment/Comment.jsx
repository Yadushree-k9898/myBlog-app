import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import myContext from "../../context/data/myContext";

function Comment({
  addComment,
  commentText,
  setCommentText,
  allComment,
  fullName,
  setFullName,
}) {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2
            className="text-lg lg:text-2xl font-bold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Make Comment
          </h2>
        </div>

        {/* Comment Form */}
        <form
          className="mb-6"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            addComment(); // Call addComment when the form is submitted
          }}
        >
          {/* Full Name Input */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Update fullName on change
              type="text"
              placeholder="Enter Full Name"
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
            />
          </div>

          {/* Text Area */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)} 
              id="comment"
              rows={6}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
              placeholder="Write a comment..."
              required
            />
          </div>

          {/* Post Comment Button */}
          <div className="">
            <Button
              type="submit" // Trigger form submission
              style={{
                background: mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              Post comment
            </Button>
          </div>
        </form>

        {/* Display Comments */}
        <article
          className="p-6 mb-6 text-base rounded-lg"
          style={{
            background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          }}
        >
          {allComment.length > 0 ? (
            allComment.map((item, index) => {
              const { fullName, commentText, date } = item;
              return (
                <div key={index}>
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg">
                      <p
                        className="inline-flex items-center mr-3 text-lg"
                        style={{ color: mode === "dark" ? "black" : "black" }}
                      >
                        {fullName}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: mode === "dark" ? "black" : "black" }}
                      >
                        {date}
                      </p>
                    </div>
                  </footer>
                  <p
                    className="text-gray-500 dark:text-gray-400 text-md"
                    style={{ color: mode === "dark" ? "white" : "black" }}
                  >
                    {commentText}
                  </p>
                </div>
              );
            })
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </article>
      </div>
    </section>
  );
}

export default Comment;
