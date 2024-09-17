import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Pressable, Text, FlatList} from 'react-native';
import moment from 'moment';
import CreateNoteButton from '../components/CreateNoteButton';
import NoteModal from '../components/NoteModal';
import {NoteManager, resetUserDefaults} from '../utils/utils';

// Call resetUserDefaults to clear notes
// resetUserDefaults();

const Notes = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const loadNotes = async () => {
    try {
      const notes = await NoteManager.loadNotes();
      setNotes(notes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSaveNote = async () => {
    if (title && body) {
      try {
        if (editing) {
          // Update existing note
          const updatedNote = await NoteManager.updateNote(
            currentNoteId,
            title,
            body,
          );
          setNotes(
            notes.map(note =>
              note.id === currentNoteId
                ? {
                    ...note,
                    title: updatedNote.title,
                    body: updatedNote.body,
                    timestamp: updatedNote.timestamp,
                  }
                : note,
            ),
          );
          setEditing(false);
        } else {
          // Save new note
          const newNote = await NoteManager.saveNote(title, body);
          setNotes([...notes, newNote]);
        }
        setTitle('');
        setBody('');
        setModalVisible(false);
        setCurrentNoteId(null);
        setErrorMessage('');
      } catch (error) {
        console.error('Error saving note:', error);
      }
    } else {
      setErrorMessage('please add title & body :)');
    }
  };

  const handleEditNote = note => {
    setTitle(note.title);
    setBody(note.body);
    setCurrentNoteId(note.id);
    setEditing(true);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setTitle('');
    setBody('');
    setEditing(false);
    setCurrentNoteId(null);
    setErrorMessage('');
  };

  return (
    <View style={styles.container}>
      {notes.length > 0 ? (
        <>
          <FlatList
            data={notes}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              const formattedTime = moment(
                item.timestamp,
                'YYYY-MM-DD HH:mm:ss Z',
              ).format('M/D/YY h:mma');
              return (
                <Pressable
                  onPress={() => handleEditNote(item)}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#acaec6' : '#eccd8f',
                    },
                    styles.noteItem,
                  ]}>
                  <View
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? '#acaec6' : '#eccd8f',
                      },
                      styles.noteItem,
                    ]}>
                    <View style={styles.noteRow}>
                      <Text style={styles.noteTitle}>{item.title}</Text>
                      <Text style={styles.noteTimestamp}>
                        last updated: {formattedTime}
                      </Text>
                    </View>
                    <Text style={styles.noteBody}>{item.body}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
          <CreateNoteButton setModalVisible={setModalVisible} />
        </>
      ) : (
        <View style={styles.emptyStateContainer}>
          <CreateNoteButton setModalVisible={setModalVisible} />
        </View>
      )}
      <NoteModal
        handleCancel={handleCancel}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleSaveNote={handleSaveNote}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  noteItem: {
    marginBottom: 8,
    marginHorizontal: 24,
    padding: 12,
    borderRadius: 8,
  },
  noteTitle: {
    fontWeight: 'bold',
    color: '#3c3e5f',
  },
  noteTimestamp: {
    color: '#8587a0',
    fontSize: 10,
  },
  noteBody: {
    color: '#3c3e5f',
    fontSize: 12,
    paddingTop: 8,
  },
});

export default Notes;
