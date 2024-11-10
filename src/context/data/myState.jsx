import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const [searchkey, setSearchkey] = useState("");
  const [loading, setLoading] = useState(true);
  const [getAllBlog, setGetAllBlog] = useState([]);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
    document.body.style.backgroundColor =
      mode === "light" ? "rgb(17,24,39)" : "white";
  };

  // Function to get all blogs from Firebase
  function getAllBlogs() {
    setLoading(true);
    const q = query(collection(fireDb, "blogPost"), orderBy("time"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let blogArray = [];
      QuerySnapshot.forEach((doc) => {
        blogArray.push({ ...doc.data(), id: doc.id });
      });
      setGetAllBlog(blogArray); // Set the blogs directly from the snapshot
      setLoading(false); // Ensure loading is set to false after data is fetched
    });
    return unsubscribe; // Cleanup function for unsubscribing from Firestore updates
  }

  useEffect(() => {
    const unsubscribe = getAllBlogs(); // Fetch blogs on component mount

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe(); // Stop listening to Firestore updates
      setLoading(false); // Reset loading state
    };
  }, []);

  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(fireDb, "blogPost", id)); // Delete the blog from Firestore
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        searchkey,
        setSearchkey,
        loading,
        setLoading,
        getAllBlog,
        deleteBlogs,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
