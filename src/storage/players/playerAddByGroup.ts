import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetGroup } from "./playersGetByGroup"
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
   const storedPlayers = await playersGetGroup(group);

   const playersAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

   if(playersAlreadyExists.length > 0) {
     throw new AppError('Essa pessoa já faz parte de um time');
   }

   const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}

