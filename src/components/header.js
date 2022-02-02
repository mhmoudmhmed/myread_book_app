import propTypes from "prop-types";
import React from "react";

const Header = ({ title }) => {
  return <h2 className="bookshelf-title">{title}</h2>;
};

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
