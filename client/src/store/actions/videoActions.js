import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

import {JOIN_CHAT, ADD_STREAM, ADD_REMOTE_STREAM, MY_STREAM} from './types';

/* API URI */
export const API_URI = 'https://0.0.0.0:5000';

/* Socket config */
export const socket = IO(`${API_URI}`, {
  forceNew: true,
});

socket.on('connection', () => console.log('Connected client connection'));

export const joinRoom = stream => async dispatch => {};

function connectToNewUser() {}
