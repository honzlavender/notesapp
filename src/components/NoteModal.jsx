import React from 'react';
import {
  Modal,
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

const NoteModal = ({
  handleSaveNote,
  setModalVisible,
  modalVisible,
  title,
  setTitle,
  body,
  errorMessage,
  setErrorMessage,
  setBody,
  handleCancel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="title."
                style={styles.input}
                value={title}
                onChangeText={text => {
                  setTitle(text);
                  setErrorMessage('');
                }}
              />
              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
              <TextInput
                placeholder={errorMessage ? '' : 'body.'}
                style={styles.bodyInput}
                value={body}
                multiline
                onChangeText={text => {
                  setBody(text);
                  setErrorMessage('');
                }}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable
                onPress={handleCancel}
                style={({pressed}) => [
                  {
                    borderRightWidth: 2,
                    borderColor: '#acaec6',
                  },
                ]}>
                {({pressed}) => (
                  <Text
                    style={[
                      {
                        color: pressed ? '#acaec6' : '#3c3e5f',
                      },
                      styles.buttonText,
                    ]}>
                    Cancel
                  </Text>
                )}
              </Pressable>
              <Pressable onPress={handleSaveNote}>
                {({pressed}) => (
                  <Text
                    style={[
                      {
                        color: pressed ? '#acaec6' : '#3c3e5f',
                      },
                      styles.buttonText,
                    ]}>
                    Save
                  </Text>
                )}
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginVertical: '35%',
    marginHorizontal: 24,
    backgroundColor: '#8587a0',
    flex: 1,
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
    height: 200,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8,
    marginHorizontal: 50,
  },
  errorMessage: {
    color: 'brown',
    fontWeight: 'bold',
    fontSize: 10,
    margin: 10,
  },
});

export default NoteModal;
