import React, { useState, useEffect } from 'react';
import useAuth from '../../useAuth';

const MessageList = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { securedFetch } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      securedFetch('http://localhost:4000/api/messages')
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setMessages(data);
        })
        .catch((e) => {
          setLoading(false);
          // handle error
          console.log(e);
        });
    };

    fetchData();
  }, [securedFetch]);

  if (loading) {
    return (<div>Loading..</div>);
  }

  return (
    <ul>
      {messages.map((m) => <li key={m.message}>{m.message}</li>)}
    </ul>
  );
};

export default MessageList;
