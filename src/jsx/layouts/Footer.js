import React from "react";

const Footer = () => {
  const d = new Date();
  return (
    <div className="footer">
      <div className="copyright p-2">
        <p>
          Copyright © Developed by{" "}
          <a href="#" target="_blank"  rel="noreferrer">
            Muhammed Osama
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
