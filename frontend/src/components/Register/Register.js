import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const HandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <body>
      <div className="container-xxl">
        <form>
          <div class="flex-column">
            <h1>Create a new account</h1>
            <div class="flex-row">
              <div class="flex-column">
                <div class="inputForm">
                  <input
                    type="text"
                    class="input"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>
              <div class="flex-column">
                <div class="inputForm">
                  <input
                    type="text"
                    class="input"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div class="flex-column">
            <label>Email </label>
            </div> */}
          <div class="inputForm">
            <input
              type="text"
              class="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* <div class="flex-column">
                <label>Password </label></div> */}
          <div class="inputForm">
            <input
              type="password"
              class="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
          </div>

          <button onClick={HandleSubmit} class="button-submit">
            Register
          </button>
          <p class="p">
            Already have an account?
            <span class="span">
              <Link to="/Login" className="underline">
                Login Here
              </Link>
            </span>
          </p>
        </form>
      </div>
    </body>
  );
};
export default Register;
