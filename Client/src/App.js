import { useSelector } from "react-redux";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import SkeletonForLoading from "./Components/SkeletonLoading/SkeletonForAllCards";
import { Box } from "@mui/material";
import { CirclesWithBar, InfinitySpin, Oval } from "react-loader-spinner";

function App() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  });

  return (
    <>
      {pageLoading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f8f8f8",
          }}
        >
          <CirclesWithBar height={80} width={80} color="#2563EB" />
        </div>
      ) : (
        <Box>
          <Header />
          <Main />
          <Footer />
        </Box>
      )}
    </>
  );
}

export default App;
