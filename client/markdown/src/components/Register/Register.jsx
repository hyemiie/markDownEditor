import axios from "axios";
import React from "react";

const Register = () => {

  return (
    <div>

      <form action="http://localhost:5000/register" method="post">
          <h1>Input here</h1>
          <input type="text" name="username" id="username" placeholder="Username"/>
          <input type="password" name="password" id="password"  placeholder="password"/>
          <input type="email" name="email" id="email" placeholder="email" />
          <button type="submit">Send</button>
        </form>
    </div>
  );
};

export default Register;
