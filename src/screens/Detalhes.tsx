import React from 'react';
import { IconButton, Text, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { Image, Linking, TouchableOpacity } from 'react-native';

interface Params {
    list: {
        name: string;
        description: string;
        link: string;
    }
}

export function Detalhes({ navigation: { goBack } }: any) {

    const route = useRoute();
    const { list } = route.params as Params

  return (
    <VStack flex={1} bg="gray.800">
        <VStack mt={7} alignItems="flex-start">
        <IconButton
        icon={
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        }
        onPress={() => goBack()}
        />
      </VStack>
      <VStack alignItems="center" mt={10}>
        <TouchableOpacity onPress={() => Linking.openURL(`${list.link}`)} style={{  }}>
          <Image
          style={{ width: 350, height: 200, marginBottom: 50, borderRadius: 10 }}
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
          <Text textAlign="center" color="green.400" fontSize={23} mb={17}>{list.link}</Text>
        </TouchableOpacity>
        <Text color="white" fontSize={30} mb={17}>{list.name}</Text>
        <Text color="white" fontSize={20} mx={4}>{list.description}</Text>
      </VStack>
        
    </VStack>
  );
}