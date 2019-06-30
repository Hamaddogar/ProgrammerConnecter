import React from "react";

const Footer = () => {
  return (
    <footer style={footer}>
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
};

const footer = {
  position: "relative",
  backgroundColor: "#343a40",
  width: "100%",
  color: "white",
  padding: "1.5rem 0",
  textAlign: "center"
};

export default Footer;
