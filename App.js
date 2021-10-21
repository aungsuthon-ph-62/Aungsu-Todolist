import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList, Alert } from "react-native";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import TodoList from "./components/TodoList";
import Empty from "./components/Empty";
import Header from "./components/Header";
import firestore, { firebase } from '@react-native-firebase/firestore';

export default function App() {
  const [data, setData] = useState([]);

  //โชว์ข้อมูลหน้าแอพ
  useEffect(() => {
    const viewTask = firestore()
      .collection('todo-task')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            value: '',
            date: '',
            ...documentSnapshot.data()
          };
        });
        setData(data);

      });
    return () => viewTask();
  }, []
  );

  const submitHandler = (value, date) => {
    const timeFormat = date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + parseInt(date.getFullYear() + 543);

    firestore()
    .collection('todo-task')
    .add({
      value: value,
      date: timeFormat,
      key: Math.random().toString()
    });

    setData((prevTodo) => {
      return [
        {
          value: value,
          date: timeFormat,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  //ลบ
  const deleteItem = (key) => {
    firestore()
      .collection('todo-task')
      .doc(key).delete()
  };

  const searchItem = (keyword) => {

  }

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="green" />
      </View>
      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header searchItem={searchItem} />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: green;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;