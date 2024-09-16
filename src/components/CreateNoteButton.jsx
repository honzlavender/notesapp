import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {width} from '../utils/utils';

const CreateNoteButton = ({setModalVisible}) => {
  return (
    <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
      <Text style={styles.buttonText}>create note</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#eccd8f',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 100,
  },
  buttonText: {
    color: '#3c3e5f',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CreateNoteButton;
