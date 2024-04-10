import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Createpost = () => {
  let token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image,setImage]=useState('')
  const navigate = useNavigate();

  //*********************************** */

  const imgUrl=''
  const imageHndle=(e)=>{
    setImage(e.target.files[0])
    console.log(e.target.files[0])

    

  }


  const formdata=new FormData()
  
  
  const handlePost = () => {
    if (!title || !body) {
      return alert("post should not be empty");
    }

   
    formdata.append('title',title)
    formdata.append('body',body)
    formdata.append('image',image)
    
    axios
      .post(
        "/createpost",
        formdata,
        {
          headers: {
            "token": token,
          },
        }
      )
      .then((response) => (window.location.href = "/home"))
      .catch((err) => console.log(err));

    console.log(title, body, image);
  };

  if (!token) {
    window.location.href = "/";
  } else {
    return (
      <div className="d-flex bg-success w-100 vh-100 align-items-center justify-content-center">
        <div className="mycard bg-white p-3 rounded-3">
          <h1 className="text-center text-primary">CreatePost</h1>

          <div>
            <label htmlFor="">Add Image +</label><br />
            <input id="inputfile" type="file" onChange={imageHndle} />
          </div>

          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control  mb-3"
              placeholder="Enter Your post title "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Body</label>
            <textarea
              className="form-control mb-3"
              placeholder="Enter the body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success mt-2 w-100"
            type="submit"
            onClick={handlePost}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
};
export default Createpost;
