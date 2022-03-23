import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';

function HomeScreen({navigation}) {
  const [action, setAction] = useState('')
  const [initSocket, setInitSocket] = useState()
  const [actionList, setActionList] = useState([])

  useEffect(() => {
    const socket = io('http://192.168.1.102:3000')

    setInitSocket(socket)

    socket.on("chat message", msg => {
      actionList.push(msg)
      setActionList(actionList.slice(0))
    })
  }, [])

  const handleSubmit = () => {
    initSocket.emit('chat message', action)
    setAction('')
  }

  return(
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <TextInput
            style={{height: 40, borderWidth: 2}}
            value={action}
            onSubmitEditing={() => handleSubmit()}
            autoCorrect={false}
            onChangeText={testMessage => setAction(testMessage)}
          />
          {actionList.map((item, index) => {
            return(
              <Text key={index}>{item}</Text>
            )
          })}
          <Button
            title="Go to actionList"
            onPress={() => navigation.navigate('ActionList')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen