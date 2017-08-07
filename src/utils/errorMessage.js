import React, { Component } from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger">
      <strong>Terjadi Kesalahan!</strong> {message}
    </div>
  )
}
