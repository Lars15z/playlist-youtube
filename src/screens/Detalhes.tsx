import React from 'react';
import { HStack, IconButton, Text, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { Image, Linking, TouchableOpacity } from 'react-native';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface Params {
    list: {
        id: string;
        name: string;
        description: string;
        link: string;
        assistir: string;
    }
}

export function Detalhes({ navigation: { goBack } }: any) {

    const route = useRoute();
    const { list } = route.params as Params

    const { getItem, setItem } = useAsyncStorage("@playlist-youtube:list");

    async function handleRemove(id: string) {
      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      const data = previousData.filter((item : any) => item.id !== id);
      setItem(JSON.stringify(data));

      goBack()
    }

  return (
    <VStack flex={1} bg="gray.800">
      <HStack mt={7} px={1} alignItems="flex-start" justifyContent="space-between">

        <IconButton
        icon={
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        }
        onPress={() => goBack()}
        />

        <IconButton
        icon={
          <Ionicons name="trash" size={24} color="white" />
        }
        onPress={() => handleRemove(list.id)}
        />

      </HStack>
      <VStack alignItems="center" mt={10}>

        <TouchableOpacity onPress={() => Linking.openURL(`${list.link}`)}>

          <Image
          style={{ width: 350, height: 200, marginBottom: 40, borderRadius: 10 }}
          source={{
            uri: `https://img.youtube.com/vi/${
              list.link.indexOf("https://youtu.be/") == 0 ? list.link.slice(-11)
              :
              list.link.indexOf("https://youtube.com/shorts/") == 0 ? list.link.substring(27, 38)
              :
              list.link.indexOf("https://www.youtube.com/watch?v=") == 0 ? list.link.substring(32, 43)
              : {}
            }/mqdefault.jpg`
          }} />

          <Text color="white" fontSize={20} textAlign="center" mb={17}>{list.assistir}</Text>
          <Text textAlign="center" color="green.400" fontSize={23} mb={17}>{list.link}</Text>

        </TouchableOpacity>

        <Text color="white" fontSize={30} mb={17}>{list.name}</Text>
        <Text color="white" fontSize={20} mx={4}>{list.description}</Text>

      </VStack>
        
    </VStack>
  );
}