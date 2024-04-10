import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [post, setPost] = useState([]);

  //const navigate = useNavigate();

  let token = localStorage.getItem("token");
  let user = localStorage.getItem("username");
  let userid = localStorage.getItem("userid");

  const handleDelete = (id, imageid) => {
    axios
      .delete(`/deletepost/${id}/${imageid}`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((response) => response)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${window.location.origin}/allpost`)
      .then((response) => {
        // console.log(response.status)
        setPost(response.data.mypost);
      })
      .catch((err) => console.log(err));
  }, [handleDelete]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!token) {
    window.location.href = "/";
  } else {
    return (
      <div id="home" className=" vh-100 w-100">
        <header className="w-100 d-flex justify-content-around align-items-center ">
          <h1>Welcome , {user}</h1>

          <nav className="w-50">
            <button className="btn btn-danger m-3" onClick={() => logout()}>
              Logout
            </button>
            <Link to={"/createpost"} className="btn btn-success m-3">
              Create Post
            </Link>
            <Link to={"/mypost"} className="btn btn-success m-3">
              Account
            </Link>
          </nav>
        </header>
        <div id="animatelogout"> </div>

        {post.map((posts, key) => (
          <div
            key={key}
            className="card m-3 p-3  mx-auto mycard"
            style={{ backgroundColor: "aqua" }}
          >
            <img
              src={`/${posts.image}`}
              width={"60%"}
              height={"400px"}
              className="mx-auto"
            />

            <div className="card-title d-flex justify-content-between ">
              <h2>{posts.title}</h2>
              {posts.postedBy._id === userid ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(posts._id, posts.image)}
                >
                  delete
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="card-body">
              <p>{posts.body}</p>
            </div>

            <div>
              {posts.postedBy.name === user ? (
                <span className="span"> Your post</span>
              ) : (
                <span className="span">Posted By : {posts.postedBy.name}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Home;
