import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button, Text } from 'react-native';

import { ReactNativeJoystick } from "@korsolutions/react-native-joystick";

const App = () => {
  const handleJoystickMove = (data) => {
    let { x, y } = data.position;
    let { screenX, screenY } = data.position;
    const { degree, radian } = data.angle;

    // Calcul de la distance par rapport à l'origine
    const distance = Math.sqrt(screenX * screenX + screenY * screenY);
    const maxDistance = 1.5;
    
    if (distance > maxDistance) {
        // Limiter les coordonnées à la distance maximale en fonction de l'angle
        screenX = maxDistance * Math.cos(radian);
        screenY = maxDistance * Math.sin(radian);
    }

    screenX = screenX / 3 * 2;
    screenY = screenY / 3 * 2;

    console.log(screenX);

    setJoystickCoords({ x, y });
    setJoystickCoordsRepere({ x2: screenX, y2: screenY });
    setDataAngle(degree);
    setRadian(radian);
  };

  const [joystickCoords, setJoystickCoords] = useState({ x: 0, y: 0 });
  const [joystickCoordsRepere, setJoystickCoordsRepere] = useState({ x2: 0, y2: 0 });
  const [dataAngle, setDataAngle] = useState(0);
  const [radian, setRadian] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#038ac9' }}>
      <ReactNativeJoystick onMove={handleJoystickMove} onStop={handleJoystickMove} backgroundColor="#d9d9d9" color="#959292" radius={75}/>
      <Text>Coordonnées du joystick : ({joystickCoords.x.toFixed(2)}, {joystickCoords.y.toFixed(2)})</Text>
      <Text>Coordonnées : ({joystickCoordsRepere.x2.toFixed(2)}, {joystickCoordsRepere.y2.toFixed(2)})</Text>
      <Text>Angle : ({dataAngle})</Text>
      <Text>Radian : ({radian})</Text>
    </View>
  );
};

export default App;
