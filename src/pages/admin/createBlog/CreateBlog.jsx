import React, { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import myContext from "../../../context/data/myContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDb } from "../../../firebase/FirebaseConfig";

function CreateBlog() {
  const context = useContext(myContext);
  const { mode } = context;

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState({
    title: "",
    category: "",
    content: "",
    time: Timestamp.now(),
  });

  // Add Post Function
  const addPost = async () => {
    if (blogs.title === "" || blogs.category === "" || blogs.content === "") {
      toast.error("Please fill all fields");
      return;
    }

    const productRef = collection(fireDb, "blogPost");
    try {
      await addDoc(productRef, {
        ...blogs,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      navigate("/dashboard" );
      toast.success("Post added successfully");
    } catch (error) {
      toast.error("Error adding post");
      console.log(error);
    }
  };

  const [text, setText] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <div
        className="p-5"
        style={{
          background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          borderBottom:
            mode === "dark"
              ? "4px solid rgb(226, 232, 240)"
              : "4px solid rgb(30, 41, 59)",
        }}
      >
        {/* Top Item */}
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center">
            {/* Dashboard Link */}
            <Link to={"/dashboard"}>
              <BsFillArrowLeftCircleFill size={25} />
            </Link>

            {/* Text */}
            <Typography
              variant="h4"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Create Blog
            </Typography>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-3">
          <input
            label="Enter Your Title"
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none ${
              mode === "dark" ? "placeholder-black" : "placeholder-black"
            }`}
            placeholder="Enter Your Title"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            name="title"
            value={blogs.title}
            onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
          />
        </div>

        {/* Category Input */}
        <div className="mb-3">
          <input
            label="Enter Your Category"
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 outline-none ${
              mode === "dark" ? "placeholder-black" : "placeholder-black"
            }`}
            placeholder="Enter Your Category"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            name="category"
            value={blogs.category}
            onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
          />
        </div>

        {/* Editor */}
        <Editor
          apiKey="9jo3lu73p1xbfqaw6jvgmsbrmy7qr907nqeafe1wbek6os9d"
          onEditorChange={(newValue, editor) => {
            setBlogs({ ...blogs, content: newValue });
            setText(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "text" }));
          }}
          init={{
            plugins:
              "lists link image charmap preview anchor searchreplace visualblocks code",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | code | link | image",
          }}
        />

        {/* Submit Button */}
        <Button
          className="w-full mt-5"
          onClick={addPost}
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
            color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
          }}
        >
          Publish Post
        </Button>

        {/* Preview Section */}
        <div className="mt-5">
          <h1 className="text-center mb-3 text-2xl">Preview</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={createMarkup(blogs.content)}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
