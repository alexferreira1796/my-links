import React from "react";
import * as S from "./styles";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();
  return (
    <S.ButtonMenu onPress={() => navigation.openDrawer()}>
      <Feather name="menu" size={40} color="#fff" />
    </S.ButtonMenu>
  );
};

export default Menu;
