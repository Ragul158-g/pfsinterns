import React, { useContext } from "react";
import { Context } from "../../main";
import LatestBlog from "../miniComponents/LatestBlog";
import HeroSection from "../miniComponents/HeroSection";
import TrendingBlogs from "../miniComponents/TrendingBlogs";
import PopularAuthors from "../miniComponents/PopularAuthors";

const Home = () => {
  const { mode, blogs } = useContext(Context);
  const filteredBlogs = blogs.slice(0,6);
  return (
    <>
      <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
        <HeroSection />
        <TrendingBlogs />
        <LatestBlog blogs={filteredBlogs} heading={"Latest Blogs"} />
        <PopularAuthors />                                                          
      </article>
    </>
  );
};

export default Home;