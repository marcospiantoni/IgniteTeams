import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import * as Style from "./styles";

export function Groups() {
  const [groups, setGroups] = useState<string[]>(
    [ 'Galera da Rocket',
    
    ]);
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
       )}
      />
    </Style.Container>
  );
}
