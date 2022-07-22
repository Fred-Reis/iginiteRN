import React, { useState } from "react";
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

import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";

import Logo from "../assets/logo_secondary.svg";

export function Home() {
  const [selected, setSelected] = useState<"open" | "closed">("open");
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "123",
      patrimony: "234235423",
      status: "open",
      when: "2020-01-01 12:00",
    },
  ]);

  const { colors } = useTheme();

  const { navigate } = useNavigation();

  function handleNewOrder() {
    navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigate("details", { orderId });
  }

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
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
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

        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
