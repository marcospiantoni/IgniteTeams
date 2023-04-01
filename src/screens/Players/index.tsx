import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";

import * as Style from "./styles";

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [player, setPlayer] = useState([' Marcos', 'Augusto', 'Cauas'])


  return (
    <Style.Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subTitle="Adicione a galera e separe os times"
      />
      <Style.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Style.Form>
      
      <Style.HeaderList>
      <FlatList
        data={["Time A", "Time B"]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
           <Filter 
            title={item} 
            isActive={item === team}
            onPress={() => setTeam(item)}
        />}
        horizontal
      />
      <Style.NumbersOfPlayers>
        {player.length}
      </Style.NumbersOfPlayers>
    </Style.HeaderList>
    </Style.Container>
  );
}
