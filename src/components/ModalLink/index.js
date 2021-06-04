import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
} from "react-native";
import * as S from "./styles";

import { Feather } from "@expo/vector-icons";
import Clipboard from "expo-clipboard";

const ModalLink = ({ onClose, data }) => {
  const [link, setLink] = React.useState(data.link || "");

  const handleCopyLink = () => {
    Clipboard.setString(link);
    alert("Copiado com sucesso!");
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Meu link encurtado: ${link}`,
      });

      if (result.action === Share.sharedAction) {
        if (!result.activityType) {
          console.log("Compartilhado com sucesso!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Modal Fechado");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <S.ContainerModal>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }}></View>
      </TouchableWithoutFeedback>
      <S.Container>
        <S.Header>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" color="#212743" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Feather name="share" color="#212743" size={30} />
          </TouchableOpacity>
        </S.Header>

        <S.LinkArea>
          <S.Title>Link encurtado</S.Title>
          <S.LongUrl numberOfLines={1}>{data.long_url}</S.LongUrl>

          <S.ShortLinkArea activeOpacity={1} onPress={handleCopyLink}>
            <S.ShortLinkUrl numberOfLines={1}>{link}</S.ShortLinkUrl>
            <TouchableOpacity>
              <Feather
                name="copy"
                color="#fff"
                size={25}
                onPress={handleCopyLink}
              />
            </TouchableOpacity>
          </S.ShortLinkArea>
        </S.LinkArea>
      </S.Container>
    </S.ContainerModal>
  );
};

export default ModalLink;
