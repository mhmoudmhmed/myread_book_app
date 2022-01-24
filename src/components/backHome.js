import React from "react";
import { Link } from "react-router-dom";

const Back = () => {
  return (
    <Link to="/">
      <button className="close-search" />
    </Link>
  );
};

export default Back;
