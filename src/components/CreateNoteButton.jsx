import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const CreateNoteButton = ({setModalVisible}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#acaec6' : '#eccd8f',
        },
        styles.button,
      ]}
      onPress={() => setModalVisible(true)}>
      <Text style={styles.buttonText}>create note</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
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
