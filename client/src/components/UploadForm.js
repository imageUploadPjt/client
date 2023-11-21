import axios from "axios";
import React, {useState} from "react";
import {toast} from "react-toastify";
import "./UploadForm.css"

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
            toast.success("success!!");
            //alert("success!!")
        } catch(err) {
            toast.success("fail!!");
            console.log(err)
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="file-dropper">
                {fileName}
                <input id="image" type='file' onChange={imageSelectHandler}/>
            </div>
            <button type = "submit" 
            style={{
                width:"100%",
                height:40,
                borderRadius:3,
                cursor:"pointer",
            }}>{/*style에 객체를 넣어줌*/}
                제출
            </button> 
            {/*일반적인 html으로 하면 스트림으로 넣는데 이방식은 잘못되도 에러가 안나서 디버깅 시 어려움 */}
        </form>
    );
}

export default UploadForm;

//이미지 업로드 하고 제출 버튼을 누르면 디폴트로 페이지가 새로고침됨
//이렇게 되면 상태가 원복되어 SPA의 장점을 죽이는 것임
// 그래서 axios를 사용   