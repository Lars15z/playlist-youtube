import React, { useCallback, useState } from 'react';
import { VStack, IconButton, Center, FlatList, Text, Heading, HStack } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface ListAllProps {
    id: string,
    name: string;
    description: string;
    link: string;
    assistir: string;
}

export function Home({ navigation } : any) {

    const [list, setList] = useState<ListAllProps[]>([]);

    const { getItem, setItem } = useAsyncStorage("@playlist-youtube:list");

    async function handleData() {
        const response = await AsyncStorage.getItem("@playlist-youtube:list");
        const data = response ? JSON.parse(response) : [];
        setList(data);
    }

    async function handleRemove(id: string) {
        const response = await getItem();
        const previousData = response ? JSON.parse(response) : [];

        const data = previousData.filter((item : any) => item.id !== id);
        setItem(JSON.stringify(data));
        setList(data)
    }

    function handleAction(list: ListAllProps) {
        navigation.navigate("Detalhes", { list })
    }

    useFocusEffect(useCallback(() => {
        handleData()
    }, []))

  return (
    <VStack flex={1} bg="gray.800">

        <HStack mt={50}>
            <Heading ml={170} color="white" fontSize={30}>Listas</Heading>

            <Center flex={1} alignItems="flex-end">
                <IconButton
                icon={
                    <Center w={51} h={51} bg="green.600" borderRadius={35}><AntDesign name="plus" size={35} color="white" /></Center>
                }
                onPress={() => navigation.navigate("addlist")}
                />
            </Center>
        </HStack>
        
        <VStack flex={1} mb={50} alignItems="center">
            <FlatList
            data={list}
            keyExtractor={({ id }) => id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
                <VStack p={1}>
                    
                    <VStack p={1} w={195} h={240} bg={item.assistir == "Importante" ? "red.600" : "emerald.600"} borderRadius={20}>
                        <HStack justifyContent="space-between" alignItems="center" ml={3}>
                            {
                                item.link.indexOf("https://youtu") == 0 && item.link.indexOf("https://www.youtu") ? <AntDesign name="youtube" size={24} color="white" />
                                :
                                item.link.indexOf("https://github") == 0 ? <AntDesign name="github" size={24} color="white" />
                                : ""
                            }
                            
                            <IconButton
                            icon={
                                <Ionicons name="trash" size={24} color="white" />
                            }
                            onPress={() => handleRemove(item.id)}
                            />
                        </HStack>
                        <TouchableOpacity onPress={() => handleAction(item)} style={{ marginTop: -3, justifyContent: "center", alignItems: "center" }}>
                            <Text numberOfLines={1} w={180} textAlign="center" fontSize={24} color="trueGray.100">
                                { item.name }
                            </Text>
                            <Text numberOfLines={1} w={180} textAlign="center" fontSize={18} color="warmGray.200">
                                { item.assistir }
                            </Text>
                            
                            <VStack>
                                
                                <Image
                                style={{ width: 170, height: 100, borderRadius: 5, marginVertical: 20 }}
                                source={{
                                    uri: `https://img.youtube.com/vi/${
                                        item.link.indexOf("https://youtu.be/") == 0 ? item.link.slice(-11)
                                        :
                                        item.link.indexOf("https://youtube.com/shorts/") == 0 ? item.link.substring(27, 38)
                                        :
                                        item.link.indexOf("https://www.youtube.com/watch?v=") == 0 ? item.link.substring(32, 43)
                                        : {}
                                    }/mqdefault.jpg`
                                }} />
                            </VStack>
                            
                        </TouchableOpacity>
                        
                    </VStack>
                
                </VStack>
            )}
            />
        </VStack>

    </VStack>
  );
}