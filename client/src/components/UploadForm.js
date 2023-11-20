import axios from "axios";
import React, {useState} from "react";


//아래는 클래스형 컴포넌트가 아닌, 함수형 컴포넌트
// 함수형 컴포넌트는 상태 (라이프사이클) 관리를 Hooks로 함, 모든 훅스는 use로 시작
//훅스를 통해 js로 컴포넌트를 관리 할 수 있음
const UploadForm = () => {
    //file이라는 변수를 선언하고 null로 초기값을 설정
    //이 값을 바꾸기 위해서는 setFile 함수를 이용해야함 , 여기에 새로운 파일값을 넣어주면 바뀜
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요");
    const imageSelectHandler = (event) => {
        const imageFile = event.target.files[0];
        console.log({imageFile});
        setFile(imageFile);
        setFileName(imageFile.name);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file)
        try {
            const res = await axios.post("/upload", formData, {
                headers: {"Content-Type" : "multipart/form-data"},
            });
            console.log({res})
            alert("success!!")
        } catch(err) {
            alert("fail!!!!")
            console.log(err)
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="image">{fileName}</label>
            <input 
                id="image" //id는 event.target의 속성 key가 됨
                type='file'
                // (1) 브라우저 콘솔에서 event 값을 확인해서 디버깅
                // onChange={(event) => {
                //     console.log({event})
                // }}

                // (2) 
                // onChange={(event) => {
                //     const imageFile = event.target.files[0];
                //     console.log({imageFile});
                //     setFile(imageFile);
                //     setFileName(imageFile.name);
                // }}
                onChange={imageSelectHandler}
            />
            <button type = "submit">제출</button>
      </form>
    );
}

export default UploadForm;

//이미지 업로드 하고 제출 버튼을 누르면 디폴트로 페이지가 새로고침됨
//이렇게 되면 상태가 원복되어 SPA의 장점을 죽이는 것임
// 그래서 axios를 사용   