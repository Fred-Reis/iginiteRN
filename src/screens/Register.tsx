import React, { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";

import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [patrimony, setPatrimony] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { goBack } = useNavigation();

  function handleNewOrder() {
    if (!patrimony || !description) {
      return Alert.alert("Register", "Preencha todos os campos");
    }

    setLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        setLoading(false);
        console.log("Order created", res);
        Alert.alert("Solicitação", "Cadastrado com sucesso");
        goBack();
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        Alert.alert("Solicitação", err.message);
      });
  }

  return (
    <VStack flex={1} bg="gray.600" p={6}>
      <Header title="Nova Solicitação" />
      <Input
        placeholder="Número do Patrimônio"
        mt={4}
        value={patrimony}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descição do Problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={loading}
        onPress={handleNewOrder}
      />
    </VStack>
  );
}
