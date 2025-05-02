import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axios/axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const themeMode = useSelector((state) => state.theme.mode); // 'light' or 'dark'

  useEffect(() => {
    axiosInstance.get("/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  const darkTheme = useSelector((state) => state.theme.darkTheme); // 'light' or 'dark'


  return (
    <div
      className={`p-4 md:px-6 md:py-24 space-y-4 md:space-y-6 min-h-screen transition-all duration-300 ${
        darkTheme ? "bg-dark-background text-dark-primaryText" : "bg-light-background text-light-primaryText"
      }`}
    >
      <h1
        className={`text-2xl md:text-3xl font-semibold mb-4 md:mb-6 ${
          darkTheme ? "text-dark-primaryText" : "text-light-primaryText"
        }`}
      >
        Latest Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className={`shadow-md rounded-lg overflow-hidden transition-all duration-300 flex flex-col ${
              darkTheme
                ? "bg-dark-secondary text-dark-secondaryText"
                : "bg-light-secondary text-light-secondaryText"
            }`}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover flex-shrink-0"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2
                  className={`text-lg md:text-xl font-bold mb-2 ${
                    darkTheme ? "text-dark-primaryText" : "text-light-primaryText"
                  }`}
                >
                  {blog.title}
                </h2>
                <p className="mb-3 line-clamp-3 md:line-clamp-4 text-sm md:text-base">{blog.content}</p>
              </div>
              <a
                href={blog.source}
                target="_blank"
                rel="noreferrer"
                className={`inline-block text-sm md:text-base font-medium rounded px-3 py-1 transition w-fit ${
                  darkTheme
                    ? "bg-dark-accent text-dark-background hover:bg-dark-hover"
                    : "bg-light-accent text-white hover:bg-light-hover"
                }`}
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;