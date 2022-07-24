import React, { useEffect, useState } from "react";
import {
  Heading,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { CircleWavyCheck, Hourglass } from "phosphor-react-native";

import { dateFormat } from "../utils/firebaseDateFormat";
import { OrderFirestorDTO } from "../DTOs/OrderFirestorDTO";

import { Header } from "../components/Header";
import { OrderProps } from "../components/Order";
import { Loading } from "../components/Loading";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [loading, setLoading] = useState<boolean>(true);
  const [solution, setSolution] = useState<string>("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { colors } = useTheme();

  const colorStatus =
    order.status === "closed" ? colors.green[300] : colors.secondary[700];

  const route = useRoute();

  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    firestore()
      .collection<OrderFirestorDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at } =
          doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={colorStatus}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "Finalizada" : "Em Andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}></ScrollView>
    </VStack>
  );
}
