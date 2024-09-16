import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Notes from './src/screens/Notes';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Notes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4A62A',
  },
});

export default App;
