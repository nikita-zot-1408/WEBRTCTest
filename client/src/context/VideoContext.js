import React, {createContext, useState} from 'react';
import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

const VideoContext = createContext();

const ContextProvider = ({children}) => {
  const [streams, setStreams] = useState([]);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [myStream, setMyStream] = useState(null);

  /* Socket configuration */
  const socket = IO('https://0.0.0.0:5000', {
    forceNew: true,
  });

  socket.on('connection', () => console.log('Connected client connection'));

  //* Peer Config *//
  const peerServer = new Peer(undefined, {
    host: '0.0.0.0',
    secure: false,
    port: 5000,
    path: '/mypeer',
  });

  peerServer.on('connect', console.log);

  const joinRoom = stream => {
    const roomID = 'asdasdasdsadqweqe12312';
    setMyStream(stream);
    setStreams([...streams, stream]);

    peerServer.on('open', userId => {
      socket.emit('join-room', {userId, roomID});
    });

    socket.on('user-connected', userId => {
      connectToNewUser(userId, stream);
    });

    peerServer.on('call', call => {
      call.answer(stream);

      call.on('stream', stream => {
        console.log('-----------', stream);
        setStreams([...streams, stream]);
      });
    });
  };

  const connectToNewUser = (userId, stream) => {
    const call = peerServer.call(userId, stream);

    call.on('stream', remoteVideoStream => {
      if (remoteVideoStream) {
        setRemoteStreams([...remoteStreams, remoteVideoStream]);
      }
    });
  };

  return (
    <VideoContext.Provider value={{joinRoom, myStream, streams, remoteStreams}}>
      {children}
    </VideoContext.Provider>
  );
};

export {ContextProvider, VideoContext};
