import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";

import {groupsGetAll} from "@storage/group/groupsGetAll"

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import * as Style from "./styles";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await groupsGetAll();
      setGroups(data);

    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível carregar as turmas.")
      } finally {
        setIsLoading(false)
      }
    } 

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Style.Container>
      <Header />
      <Highlight 
        title="Turmas" 
        subTitle="Jogue com a sua turma!" 
      />
     
     {isLoading ? <Loading /> : 
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
           <GroupCard title={item} 
           onPress={() => handleOpenGroup(item)}
        />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => 
        <ListEmpty message="Cadastre uma turma!" />}
      />
    }
      <Button 
        title="Criar nova turma" 
        onPress={handleNewGroup} />
    </Style.Container>
  );
}
