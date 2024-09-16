import React, {useState} from 'react';
import {
  Modal,
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

const NoteModal = ({
  handleSaveNote,
  setModalVisible,
  modalVisible,
  title,
  setTitle,
  body,
  setBody,
  handleCancel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalView}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="title."
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            placeholder="body."
            style={styles.bodyInput}
            value={body}
            multiline
            editable
            numberOfLines={6}
            onChangeText={text => setBody(text)}
          />
        </View>
        <View style={styles.modalButtonContainer}>
          <Pressable
            style={{borderRightWidth: 2, borderColor: '#acaec6'}}
            onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.buttons} onPress={handleSaveNote}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginVertical: '35%',
    marginHorizontal: 24,
    flex: 1,
    backgroundColor: '#8587a0',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#acaec6',
    borderRadius: 5,
  },
  input: {
    borderBottomWidth: 5,
    borderColor: '#8587a0',
    padding: 10,
  },
  bodyInput: {
    padding: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#3c3e5f',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8,
    marginHorizontal: 50,
  },
});

export default NoteModal;
