import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { groupCreate } from "@storage/group/groupCreate";

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import * as Style from "./styles";


export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

   async function handleNew() {
    try {
      await groupCreate(group);
      navigation.navigate("players", { group });

    } catch (error) {
      console.log(error);
    }
   }
  
  return (
    <Style.Container>
      <Header showBackButton />

      <Style.Content>
        <Style.Icon />
        <Highlight
          title="Nova turma"
          subTitle="Crie uma tumar para adicionar pessoas!"
        />

        <Input 
          placeholder="Nome da turma" 
          onChangeText={setGroup}
        />

        <Button
         title="Criar" 
         onPress={handleNew} />
      </Style.Content>
    </Style.Container>
  );
}
