import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const MainPage = () => {
  const Tab = createBottomTabNavigator();
  const [classrooms, setClassrooms] = useState([1, 2, 3]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Classes">
        {() => <ClassesTab classrooms={classrooms} />}
      </Tab.Screen>
      <Tab.Screen name="Add Class">
        {() => <AddClassTab classrooms={classrooms} setClassrooms={setClassrooms} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const ClassesTab = ({ classrooms }) => {
  const navigation = useNavigation();

  const navigateToClassroom = (classroomNumber) => {
    navigation.navigate('Classroom', { classroomNumber });
  };

  return (
    <View style={styles.container}>
      {classrooms.map((classroomNumber) => (
        <Button
          key={classroomNumber}
          title={`Classroom ${classroomNumber}`}
          onPress={() => navigateToClassroom(classroomNumber)}
          style={styles.classroomButton}
        />
      ))}
    </View>
  );
};

const AddClassTab = ({ classrooms, setClassrooms }) => {
  const [newClassroom, setNewClassroom] = useState('');

  const addClassroom = () => {
    if (newClassroom && !classrooms.includes(newClassroom)) {
      setClassrooms((prevClassrooms) => [...prevClassrooms, newClassroom]);
      setNewClassroom('');
    } else {
      alert('Please enter a valid classroom number.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newClassroom}
          onChangeText={(text) => setNewClassroom(text)}
          placeholder="New Classroom Number"
          keyboardType="numeric"
        />
        <Button title="ADD Class" onPress={addClassroom} style={styles.addButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classroomButton: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    marginTop: 0, // Adjust the margin as needed
  },
});

export default MainPage;
