import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import { Loading } from "../components/Loading";

export const Routes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return subscribe;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
