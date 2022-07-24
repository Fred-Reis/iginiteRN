import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Box,
  Heading,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from "phosphor-react-native";

import { dateFormat } from "../utils/firebaseDateFormat";
import { OrderFirestorDTO } from "../DTOs/OrderFirestorDTO";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { OrderProps } from "../components/Order";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution?: string;
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
  const { goBack } = useNavigation();

  const { orderId } = route.params as RouteParams;

  function handleOrderClose() {
    if (!solution) {
      Alert.alert("Solicitação", "Por favor, informe a solução.");
    }

    setLoading(true);

    firestore()
      .collection<OrderFirestorDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLoading(false);
        Alert.alert("Solicitação", "Solicitação Encerrada");
        goBack();
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        Alert.alert("Solicitação", err.message);
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestorDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          solution,
          status,
          created_at,
          closed_at,
        } = doc.data();

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
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

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

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimônio: ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order?.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {!order.solution && (
            <Input
              placeholder="Digite a solução"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button title="Encerrar Solicitação" m={5} onPress={handleOrderClose} />
      )}
    </VStack>
  );
}
