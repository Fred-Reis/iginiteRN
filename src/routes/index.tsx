import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";

export const Routes = () => {
  return (
    <NavigationContainer>
      {/* <SignIn /> */}
      <AppRoutes />
    </NavigationContainer>
  );
};
