import React from "react";
import { View, Text } from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";

import * as S from "./styles";

import { Feather } from "@expo/vector-icons";

const ListItem = ({ data, selectedItem, deleteItem }) => {
  const rightActions = () => {
    return (
      <S.ActionContainer onPress={() => deleteItem(data.id)}>
        <Feather name="trash" color="#fff" size={24} />
      </S.ActionContainer>
    );
  };

  return (
    <View>
      <Swipeable renderRightActions={rightActions}>
        <S.ContainerButton
          activeOpacity={0.9}
          onPress={() => selectedItem(data)}
        >
          <Feather name="link" color="#fff" size={24} />
          <S.Link numberOfLines={1}>{data.long_url}</S.Link>
        </S.ContainerButton>
      </Swipeable>
    </View>
  );
};

export default ListItem;
