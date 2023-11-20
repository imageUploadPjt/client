import React from "react";
import UploadForm from "./components/UploadForm";


//return에는 최상위 태그가 하나여야함
const App = () => {
  return (
    <div>
      <h2>사진첩123</h2>
      <UploadForm/>
    </div>
  );
}

export default App;
