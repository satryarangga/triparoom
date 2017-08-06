import React, { Component } from 'react';

const Loader = ({ text }) => {
  return (
    <div>
      <div className="cp-pinwheel"></div>
      <h4 className="text-center">{text}</h4>
    </div>
  )
}

export default Loader;
