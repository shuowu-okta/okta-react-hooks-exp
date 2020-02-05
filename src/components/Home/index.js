import React from 'react';
import useAuth from '../../useAuth';

const Home = () => {
  const { authenticated } = useAuth()

  if (!authenticated) {
    return <div>Please login</div>
  }

  return (
    <div>
      <a href="/message-list">Message List</a>
    </div>
  );
};

export default Home;
