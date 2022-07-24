import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  VStack,
  Heading,
  useTheme,
  FlatList,
  IconButton,
  Center,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SignOut, ChatTeardropText } from "phosphor-react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { dateFormat } from "../utils/firebaseDateFormat";

import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";

import Logo from "../assets/logo_secondary.svg";
import { Alert } from "react-native";
import { Loading } from "../components/Loading";

export function Home() {
  const [selected, setSelected] = useState<"open" | "closed">("open");
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { colors } = useTheme();

  const { navigate } = useNavigation();

  function signOut() {
    auth()
      .signOut()
      .catch((err) => {
        console.log(err);
        Alert.alert("SignOut", err.message);
      });
  }

  function handleNewOrder() {
    navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigate("details", { orderId });
  }

  useEffect(() => {
    setLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", selected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          };
        });

        setLoading(false);
        setOrders(data);
      });

    return subscriber;
  }, [selected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        alignItems="center"
        justifyContent="space-between"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={signOut}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            title="Em andamento"
            type="open"
            onPress={() => setSelected("open")}
            isActive={selected === "open"}
          />
          <Filter
            title="Finalizado"
            type="closed"
            onPress={() => setSelected("closed")}
            isActive={selected === "closed"}
          />
        </HStack>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"}solicitações{" "}
                  {selected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
