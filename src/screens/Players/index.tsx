import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import * as Style from "./styles";

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayer] = useState([]);

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
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <Style.NumberOfPlayers>
          {players.length}
        </Style.NumberOfPlayers>
      </Style.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não pessoas nesse time!" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
           {paddingBottom: 100}, 
           players.length === 0 && {flex: 1}
        ]}
      />
      <Button
      title="Remover Turma" 
      type="SECONDARY"
      />
    </Style.Container>
  );
}
