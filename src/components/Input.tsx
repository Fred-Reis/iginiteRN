import React from "react";
import { Input as NativebaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativebaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderColor: "green.500",
        borderWidth: 2,
        bg: "gray.700",
      }}
      {...rest}
    />
  );
}
