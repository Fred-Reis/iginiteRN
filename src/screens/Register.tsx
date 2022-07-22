import React from "react";
import { VStack } from "native-base";

import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Button } from "../components/Button";

export function Register() {
  return (
    <VStack flex={1} bg="gray.600" p={6}>
      <Header title="Nova Solicitação" />
      <Input placeholder="Número do Patrimônio" mt={4} />
      <Input
        placeholder="Descição do Problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />

      <Button title="Cadastrar" mt={5} />
    </VStack>
  );
}
