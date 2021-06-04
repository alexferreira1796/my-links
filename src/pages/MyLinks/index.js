import React from "react";
import { Modal, ActivityIndicator } from "react-native";
import * as S from "./styles";

import { useIsFocused } from "@react-navigation/native";

import Menu from "../../components/Menu";
import StatusBarPage from "../../components/StatusBarPage";
import ListItem from "../../components/ListItem";
import ModalLink from "../../components/ModalLink";

import { getLinksSave, deleteLink } from "../../utils/storeLinks";

const MyLinks = () => {
  const isFocused = useIsFocused();
  const [links, setLinks] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [linkReturn, setLinkReturn] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getLinks() {
      const result = await getLinksSave("@saveLink");
      setLinks(result);
      setLoading(false);
    }
    getLinks();
  }, [isFocused]);

  const handleItem = (item) => {
    setLinkReturn(item);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    const result = await deleteLink(links, id, "@saveLink");
    setLinks(result);
  };

  return (
    <S.Container>
      <StatusBarPage barStyle="light-content" backgroundColor="#132742" />

      <Menu />

      <S.Title>Meus Links</S.Title>

      {loading && (
        <S.ContainerEmpty>
          <S.WarningText>
            <ActivityIndicator color="#fff" size={25}></ActivityIndicator>
          </S.WarningText>
        </S.ContainerEmpty>
      )}

      {!loading && links.length === 0 && (
        <S.ContainerEmpty>
          <S.WarningText>Você ainda não possui nenhum link :(</S.WarningText>
        </S.ContainerEmpty>
      )}
      <S.ListLink
        data={links}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ListItem
            data={item}
            selectedItem={handleItem}
            deleteItem={handleDelete}
          />
        )}
        contentContainerStyle={{ paddingBottom: 22 }}
        showVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalLink onClose={() => setModalVisible(false)} data={linkReturn} />
      </Modal>
    </S.Container>
  );
};

export default MyLinks;
