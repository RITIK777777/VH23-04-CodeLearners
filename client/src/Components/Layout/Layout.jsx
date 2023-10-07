import React from "react";
import Header from "./NavBar";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

// import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />

        {children}
      </main>
     
    </div>
  );
};

Layout.defaultProps = {
  title: "Scholarship awareness portal",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "CodeLearners",
};

export default Layout;
