import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { axiosInstance } from "../../config/axiosInstance";

export const Signup = () => {
  

  // Get current theme
  const {theme} = useSelector((state)=> state.theme)

  // Set user
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Handle submit
  const handleSubmit = async (e) => {
    // Block refresh
    e.preventDefault();

    // Handle file
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    // Set form data
    const newUser = new FormData();
    newUser.append("profilePicture", user.profilePicture);
    newUser.append("name", user.name);
    newUser.append("email", user.email);
    newUser.append("password", user.password);
    newUser.append("confirmPassword", user.confirmPassword);
    newUser.append("mobile", user.mobile);

    // Api call
    const [response, error] = await axiosInstance(
      `/user/signup`,
      "POST",
      user,
      { ...headers }
    );

    // Check response
    if (response) {
      alert("Registerd successfully");
      navigate("/login");
    } else {
      alert("Something went wrong! Try again!");
      console.log(error);
    }
  };

  // Get input
  const handleInput = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  // Handle file
  const handleImage = (e) => {
    setUser({ ...user, profilePicture: e.target.files[0] });
  };

  return (
    <div className="vh-100">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className=" signup-box mt-5 mx-auto d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold">Signup</h3>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Name"
            name="name"
            required
            minLength="3"
            maxLength="30"
            onChange={(e) => handleInput(e, "name")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Email"
            name="email"
            required
            onChange={(e) => handleInput(e, "email")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="mobile"
            placeholder="Mobile"
            name="mobile"
            required
            onChange={(e) => handleInput(e, "mobile")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            placeholder="Password"
            name="password"
            minLength="4"
            required
            onChange={(e) => handleInput(e, "password")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleInput(e, "confirmPassword")}
          />
        </div>
        <div>
          <label className=" bg-white file-labal rounded-2 py-2 px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 me-1 mb-1"
              height="20px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Profile photo
            <input type="file" name="file" onChange={handleImage} />
          </label>
        </div>
        <div>
          <Button
            className="rounded-2 border-0 px-4 hover py-2 text-center 
            text-white mt-1" type="submit" variant={theme ? "warning" : "dark"}> Signup
          </Button>
        </div>
        <div>
          <span className="text-secondary">Already have an account?</span>{" "}
          <Link className="text-decoration-none text-black" to={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}


