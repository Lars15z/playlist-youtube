import React, { useState } from 'react';
import { Heading, HStack, IconButton, Input, Text, Toast, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export function AddList({ navigation: { goBack } } : any) {

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

  async function handleNew() {

    try {
      const id = uuid.v4();

      const newData = {
        id,
        name,
        description,
        link
      }

      const response = await AsyncStorage.getItem("@playlist-youtube:list");
      const previousData = response ? JSON.parse(response) : [];

      const data = [...previousData, newData];

      await AsyncStorage.setItem("@playlist-youtube:list", JSON.stringify(data));

      Toast.show({
        title: "Sucesso",
        placement: "top",
        bgColor: "green.600",
        w: 150,
        h: 50,
        justifyContent: "center",
        alignItems: "center"
      })

      goBack()
      
    } catch(error) {
      Toast.show({
        title: "Erro",
        placement: "top",
        bgColor: "red.600",
        w: 150,
        h: 50,
        justifyContent: "center",
        alignItems: "center"
      })
    }
  }

  return (
    <VStack flex={1} bg="gray.800">
      <HStack mt={7} alignItems="flex-start">
        <IconButton
        icon={
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        }
        onPress={() => goBack()}
        />
        <Heading textAlign="center" color="white" ml={10} p={3}>Adicione sua lista</Heading>
      </HStack>
      <VStack flex={1} p={5}>
        
        <VStack>
          <Text fontSize={23} p={5} textAlign="center" color="white">Nome</Text>
          <Input
          textAlign="center"
          color="white"
          fontSize={18}
          borderWidth={1}
          borderRadius={10}
          borderColor="green.600"
          onChangeText={setName}
          />
        </VStack>
        <VStack>
          <Text fontSize={23} p={5} textAlign="center" color="white">Descrição</Text>
          <Input
          textAlign="center"
          fontSize={18}
          color="white"
          borderWidth={1}
          borderColor="green.600"
          onChangeText={setDescription}
          />
        </VStack>
        <VStack>
          <Text fontSize={23} p={5} textAlign="center" color="white">Link</Text>
          <Input
          textAlign="center"
          fontSize={18}
          color="white"
          borderWidth={1}
          borderColor="green.600"
          onChangeText={setLink}
          />
        </VStack>
        <VStack flex={1} alignItems="center" mt="75%">
          
          <TouchableOpacity onPress={handleNew} style={{ backgroundColor: "#16a34a", width: 180, height: 65, justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
            <Text color="success.50" fontSize={25}>Salvar</Text>
          </TouchableOpacity>
          
        </VStack>

      </VStack>
      
    </VStack>
  );
}