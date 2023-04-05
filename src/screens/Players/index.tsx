import { useState } from "react";
import { useRoute } from "@react-navigation/native"
import { FlatList, Alert } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import * as Style from "./styles";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetGroup } from "@storage/players/playersGetByGroup";

type RouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("")
  const [team, setTeam] = useState("Time A");
  const [players, setPlayer] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
     return Alert.alert("Nova pessoa", "Informe o nome da pessoa para adicionar.")
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try{
      await playerAddByGroup(newPlayer, group);
      const players = await playersGetGroup(group);
      console.log(players)

    }catch(error) {
      if(error instanceof AppError){
        Alert.alert("Nova pessoa", error.message);
      }else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possivel adicionar.")
      }
    }
  }

  return (
    <Style.Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle="Adicione a galera e separe os times"
      />
      <Style.Form>
        <Input 
        onChangeText={setNewPlayerName}
         placeholder="Nome da pessoa" 
         autoCorrect={false} 
      />

        <ButtonIcon 
          icon="add" 
          onPress={handleAddPlayer}
        />
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
