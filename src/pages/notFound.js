import React from "react";
import { Link } from "react-router-dom";
 
const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/login">Go back to login</Link>
    </div>
  );
};
 
export default NotFound;