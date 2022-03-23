import {Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';

const ActionData = () => {
    const [listAction,setListAction] = useState([])
    useEffect(() => {
        const socket = io('http://192.168.1.102:3000')

        socket.on("chat message", msg => {
            listAction.push(msg)
            setListAction(listAction.slice(0))
        })
    }, [])
  return (
    <View>
      {
          listAction.map((item, index) => {
              return(
                  <Text key={index}>{item}</Text>
              )
          })
      }
    </View>
  )
}

export default ActionData