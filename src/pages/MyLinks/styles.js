import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #132742;
`;

export const Title = styled.Text`
  margin-top: ${Platform.OS === "ios" ? 23 + "%" : 20 + "%"};
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 33px;
  font-weight: bold;
  color: #fff;
`;

export const ListLink = styled.FlatList``;

export const ContainerEmpty = styled.View`
  margin-top: 15%;
  align-items: center;
`;

export const WarningText = styled.Text`
  font-size: 17px;
  color: #fff;
`;
