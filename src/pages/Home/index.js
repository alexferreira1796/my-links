import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as S from "./styles";

import { Feather } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import StatusBarPage from "../../components/StatusBarPage";
import Menu from "../../components/Menu";
import ModalLink from "../../components/ModalLink";

import api from "../../services/api";

import { saveLink } from "../../utils/storeLinks";

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [linkReturn, setLinkReturn] = React.useState({});

  const handleShortLink = async () => {
    setLoading(true);
    try {
      const res = await api.post("/shorten", {
        long_url: input,
      });
      setLinkReturn(res.data);

      saveLink("@saveLink", res.data);

      setModalVisible(true);
      Keyboard.dismiss();
      setInput("");
    } catch (error) {
      console.log(error.message);
      alert("Ops, algo deu errado!");
    } finally {
      Keyboard.dismiss();
      setInput("");
      setLoading(false);
    }
    //setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={["#1ddbb9", "#132742"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <StatusBarPage barStyle="light-content" backgroundColor="#1ddbb9" />
        <Menu />

        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "position"}
          enabled={true}
        >
          <S.ContainerLogo>
            <S.Logo
              source={require("../../assets/MyLink.png")}
              resizeMode="contain"
            />
          </S.ContainerLogo>

          <S.ContainerContent>
            <S.Title>My Link</S.Title>
            <S.Subtitle>Cole seu link para encurtar</S.Subtitle>

            <S.ContainerInput>
              <S.BoxIcon>
                <Feather name="link" size={22} color="#fff" />
              </S.BoxIcon>
              <S.Input
                placeholder="Cole seu link aqui"
                placeholderTextColor="#fff"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                value={input}
                onChangeText={(value) => setInput(value)}
              />
            </S.ContainerInput>

            <S.ButtonLink onPress={handleShortLink}>
              {loading ? (
                <ActivityIndicator color="#121212" size={24} />
              ) : (
                <S.ButtonLinkText>Gerar Link</S.ButtonLinkText>
              )}
            </S.ButtonLink>
          </S.ContainerContent>
        </KeyboardAvoidingView>

        <Modal visible={modalVisible} transparent animationType="slide">
          <ModalLink onClose={() => setModalVisible(false)} data={linkReturn} />
        </Modal>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Home;
