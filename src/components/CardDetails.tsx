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
  const { colors } = useTheme();
  return (
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
      <HStack alignItems="center" mb={4}>
        <Icon color={colors.primary[700]} />
        <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>

      {description && (
        <Text color="gray.100" fontSize="md">
          {description}
        </Text>
      )}

      {children}

      {footer && (
        <Box borderTopColor="gray.400" borderTopWidth={1} mt={3}>
          <Text mt={3} color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
