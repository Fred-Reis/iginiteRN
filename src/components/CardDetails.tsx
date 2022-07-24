import React, { ReactNode, ElementType } from "react";
import { IconProps } from "phosphor-react-native";
import { VStack, HStack, Text, Box, useTheme } from "native-base";

type Props = {
  title: string;
  description?: string;
  footer?: string;
  icon: ElementType<IconProps>;
  children?: ReactNode;
};

export function CardDetails({
  title,
  description = null,
  footer = null,
  icon: Icon,
  children,
  ...rest
}: Props) {
  return <VStack></VStack>;
}
