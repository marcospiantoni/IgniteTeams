import { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FlatList, Alert, TextInput } from "react-native";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetByGroup } from "@storage/players/playersGetByGroup";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { playersGetByGroupAndTeam } from "@storage/players/playersGetByGroupAndTeam";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import * as Style from "./styles";



type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayer] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
     return Alert.alert("Novo participante", "Informe o nome do participante para adicionar.")
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try{
      await playerAddByGroup(newPlayer, group);
      
      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();

      const players = await playersGetByGroup(group);
      console.log(players)

    }catch(error) {
      if(error instanceof AppError){
        Alert.alert("Novo participante", error.message);
      }else {
        console.log(error);
        Alert.alert("Novo participante", "Não foi possivel adicionar.")
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
     
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayer(playersByTeam);
     
    } catch (error) {
      console.log(error);
      Alert.alert("Participantes", "Não foi possivel carregar os participante do time.");
      } finally {
        setIsLoading(false);
      }
   }

  async function handlePlayerRemove(playerName: string) {
   try {
     await playerRemoveByGroup(playerName, group);
     fetchPlayersByTeam(); 

   } catch (error) {
    console.log(error);
    Alert.alert("Remover Participante", "Não foi possivel remover esse participante.")
   }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Não foi posível remover o grupo');
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover a turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Style.Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle="Adicione a galera e separe os times"
      />
      <Style.Form>
        <Input 
         inputRef={newPlayerNameInputRef}
         onChangeText={setNewPlayerName}
         value={newPlayerName}
         placeholder="Nome do participante" 
         autoCorrect={false} 
         onSubmitEditing={handleAddPlayer}
         returnKeyType="done"
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

      {
          isLoading ? <Loading /> :

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
           name={item.name} 
           onRemove={() => handlePlayerRemove(item.name)} 
          />
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
    }
      <Button
      title="Remover turma" 
      type="SECONDARY"
      onPress={handleGroupRemove}
      />
    </Style.Container>
  );
}
