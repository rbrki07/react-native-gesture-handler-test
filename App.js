// @ts-check
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import { CameraView, useCameraPermissions } from 'expo-camera'
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [status, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (status && !status.granted && status.canAskAgain) {
      requestPermission()
    }
  }, [status, requestPermission])

  const doubleTapGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(250)
        .onStart(() => {
          console.log('doubleTapGesture > onStart')
        }),
    []
  )

  const longPressGesture = useMemo(
    () =>
      Gesture.LongPress()
        .minDuration(750)
        .onStart(() => {
          console.log('longPressGesture > onStart')
        }),
    []
  )

  return (
      <GestureHandlerRootView>
        <GestureDetector gesture={Gesture.Race(doubleTapGesture, longPressGesture)}>
          <View style={styles.container}>
            <CameraView style={{ height: "100%", width: "100%" }}/>
            <StatusBar style="auto" />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
