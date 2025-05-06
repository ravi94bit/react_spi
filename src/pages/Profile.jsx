// src/pages/Profile.jsx
import { Helmet } from 'react-helmet';
import { Component } from '../config/constants';

function Profile() {
  return (
    <>
      <Helmet>
        <title>{Component} - Profile</title>
      </Helmet>
      <h2>Welcome to your Profile</h2>
    </>
  );
}

export default Profile;
