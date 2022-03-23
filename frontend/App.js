/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TextInput
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

const App = (props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [message, setMessage] = useState('')
  const [testSocket, setSocket] = useState()
  const [messList, setMessList] = useState([])

  useEffect(() => {
    const socket = io('http://192.168.1.102:3000')

    setSocket(socket)

    socket.on("chat message", msg => {
      messList.push(msg)
      setMessList(messList.slice(0))
      console.log(messList)
    })
  }, [])


  const handleSubmit = () => {
    testSocket.emit('chat message', message)
    setMessage('')
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <TextInput
            style={{height: 40, borderWidth: 2}}
            value={message}
            onSubmitEditing={() => handleSubmit()}
            autoCorrect={false}
            onChangeText={testMessage => setMessage(testMessage)}
          />
          {messList.map((item, index) => {
            return(
              <Text key={index}>{item}</Text>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
