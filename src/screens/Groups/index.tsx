import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { FlatList } from "react-native";

import { groupsGetAll } from "@storage/groupsGetAll";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import * as Style from "./styles";


export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    function handleNewGroup(){
      navigation.navigate('new');
    }

    async function fetchGroups() {
      try {
    const data = await groupsGetAll()
       setGroups(data);
      } catch (error) {
        console.log(error);
      }
    }

    useFocusEffect(useCallback(() => {
      fetchGroups();
    }, []));

  return (
    <Style.Container>
      <Header />
      <Highlight 
        title="Turmas" 
        subTitle="Jogue com a sua turma!" />

      <FlatList
       data={groups}
       keyExtractor={item => item}
       renderItem= {({ item }) => (
         <GroupCard 
           title={item} 
         />
       )}contentContainerStyle={groups.length === 0 && {flex: 1}}
         ListEmptyComponent={() => ( 
            <ListEmpty 
            message="Cadastre uma turma!"/>
          )}
        />
      <Button
       title="Criar nova turma"
       onPress={handleNewGroup}
       />
    </Style.Container>
  );
}