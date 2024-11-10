
import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import Comment from "../../components/comment/Comment";

const BlogInfo = () => {
  const context = useContext(myContext);
  const { mode, loading, setLoading } = context;

  const params = useParams();
  const [getBlogs, setGetBlogs] = useState(null);

  // All comments state moved outside of the addComment function
  const [allComment, setAllComment] = useState([]);
  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getAllBlogs();
    getComments();
   
     // Fetch comments when the page loads
  }, [params.id]);

  // Fetch blog details
  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const blogDoc = await getDoc(doc(fireDb, "blogPost", params.id));
      if (blogDoc.exists()) {
        const blogData = blogDoc.data();
        console.log("Fetched Blog Data:", blogData); // Debugging step to ensure data is fetched
        setGetBlogs(blogData);
      } else {
        console.log("Blog post does not exist");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching blog: ", error);
      setLoading(false);
    }
  };

  // Fetch all comments related to the blog post
  const getComments = async () => {
    try {
      const q = query(
        collection(fireDb, "blogPost/" + `${params.id}/` + "comment"),
        orderBy("time")
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let commentsArray = [];
        QuerySnapshot.forEach((doc) => {
          commentsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(commentsArray);
      });
      return unsubscribe; // Cleanup subscription when component unmounts
    } catch (error) {
      console.log("Error fetching comments: ", error);
    }
  };

  // Add a new comment
  const addComment = async () => {
    const commentRef = collection(
      fireDb,
      "blogPost/" + `${params.id}/` + "comment"
    );
    try {
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.log("Error adding comment: ", error);
    }
  };

  // Function to render the blog content with HTML
  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
        <div className="py-4 lg:py-8">
          {loading ? (
            <Loader />
          ) : (
            <div>
              {/* Title and Date */}
              <div className="flex justify-between items-center mb-5">
                <h1
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className="text-2xl font-semibold"
                >
                  {getBlogs?.title} {/* Log title directly to check */}
                </h1>
                <p
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className="text-sm"
                >
                  {getBlogs?.date}
                </p>
              </div>

              {/* Divider */}
              <div
                className={`border-b mb-5 ${
                  mode === "dark" ? "border-gray-600" : "border-gray-400"
                }`}
              />

              {/* Blog Content */}
              <div className="content">
                <div
                  className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${mode === "dark" ? "[&>h1]:text-[#ff4d4d]" : "[&>h1]:text-black"}
                        [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                        ${mode === "dark" ? "[&>h2]:text-white" : "[&>h2]:text-black"}
                        [&>h3]:text-[18.72px] [&>h3]:font-bold [&>h3]:mb-2.5
                        ${mode === "dark" ? "[&>h3]:text-white" : "[&>h3]:text-black"}
                        [&>p]:text-[16px] [&>p]:mb-1.5
                        ${mode === "dark" ? "[&>p]:text-[#7efff5]" : "[&>p]:text-black"}`}
                  dangerouslySetInnerHTML={createMarkup(getBlogs?.content)} // Render blog content directly
                />
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <Comment
          addComment={addComment}
          commentText={commentText}
          setCommentText={setCommentText}
          allComment={allComment}
          fullName={fullName}
          setFullName={setFullName}
        />
      </section>
    </Layout>
  );
};

export default BlogInfo;
