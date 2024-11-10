import React from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import BlogPostCard from "../../components/blogPostCard/BlogPostCard";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";


function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
}, [])
  return (
    <Layout>
      <HeroSection />
      <BlogPostCard/>
    
      <Loader/>
    </Layout>
  );
}
export default Home;
