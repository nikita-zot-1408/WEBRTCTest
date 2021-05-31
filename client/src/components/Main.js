import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';

import {mediaDevices, RTCView} from 'react-native-webrtc';
import {VideoContext} from '../context/VideoContext';

const Main = () => {
  const {joinRoom, myStream, streams, remoteStreams} = useContext(VideoContext);
  const loadWEBRTC = async () => {
    let isFront = true;
    await mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: isFront ? 'user' : 'environment',
            deviceId: videoSourceId,
          },
        })
        .then(stream => {
          joinRoom(stream);
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  };

  useEffect(() => {
    loadWEBRTC();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderColor: 'yellow',
          borderWidth: 4,
          height: Dimensions.get('screen').height / 2,
        }}>
        {myStream ? (
          <RTCView
            style={{
              height: '100%',
              width: 300,
            }}
            streamURL={myStream.toURL()}
          />
        ) : null}
      </View>
      <ScrollView horizontal style={{padding: 10, backgroundColor: 'black'}}>
        {streams.length > 0 &&
          streams.map(el => {
            return (
              <View
                key={Math.random()}
                style={{
                  justifyContent: 'center',
                  backgroundColor: 'blue',
                  borderWidth: 1,
                  borderColor: '#fff',
                  padding: 5,
                  width: 300,
                }}>
                <RTCView
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  streamURL={el.toURL()}
                />
              </View>
            );
          })}
        {remoteStreams.length > 0 &&
          remoteStreams.map(el => {
            return (
              <View
                key={Math.random()}
                style={{
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  borderWidth: 1,
                  borderColor: '#fff',
                  padding: 5,
                  width: 300,
                }}>
                <RTCView
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  streamURL={el.toURL()}
                />
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};

export default Main;
