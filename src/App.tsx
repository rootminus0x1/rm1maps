/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
// import type {PropsWithChildren} from 'react';
import * as RN from 'react-native';

//import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';

import RM1Map from './RM1Map';

/*
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
*/

/*
const Colors = {
  primary: '#1292B4',
  white: '#FFF',
  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  darker: '#222',
  black: '#000',
};
*/

function App(): React.JSX.Element {
  /*
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  */

  return (
    <RN.View>
      <RN.Text>Hello World!</RN.Text>
      <RN.Text onPress={buttonPressed} style={styles.highlight}>
        Press me
      </RN.Text>
      <RM1Map
        width={styles.mapcontainer.width}
        height={styles.mapcontainer.height}
        center={{longitude: 20.5, latitude: 41.0}}
        zoom={7}
        layers={['osm']}
        regions={['albania']}
        style={'osm-liberty'}
      />
    </RN.View>
  );
}

function buttonPressed() {
  console.log('Test Button!');
}

const styles = RN.StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  mapcontainer: {
    height: '100vh',
    width: '100%',
  },
});

export default App;
