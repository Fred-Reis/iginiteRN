import React, { useState } from "react";
import { Alert } from "react-native";
import { VStack, Heading, Icon, useTheme } from "native-base";
import auth from "@react-native-firebase/auth";

import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("SignIn", "Digite Email e Senha");
    }

    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        if (err.code === "auth/user-not-found") {
          return Alert.alert("SignIn", "Usuário não encontrado!");
        }

        if (err.code === "auth/wrong-password") {
          return Alert.alert("SignIn", "Senha ou Email inválido!");
        }

        if (err.code === "auth/invalid-email") {
          return Alert.alert("SignIn", "Email inválido!");
        }

        console.log(err);
      });

    setLoading(false);
    console.log(email, password);
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Access your account
      </Heading>

      <Input
        placeholder="Email"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        value={email}
        onChangeText={setEmail}
        _focus={{
          borderColor: "green.500",
          borderWidth: 2,
          bg: "gray.700",
        }}
      />
      <Input
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        _focus={{
          borderColor: "green.500",
          borderWidth: 2,
          bg: "gray.700",
        }}
      />

      <Button
        title="Login"
        w="full"
        mt={8}
        onPress={handleSignIn}
        isLoading={loading}
      />
    </VStack>
  );
};
