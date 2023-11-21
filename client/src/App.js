import React from "react";
import UploadForm from "./components/UploadForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//return에는 최상위 태그가 하나여야함
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <h2>사진첩123</h2>
      <UploadForm/>
    </div>
  );
}

export default App;
