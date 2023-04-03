import {useNavigation} from "@react-navigation/native"

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import * as Style from "./styles";

export function NewGroup() {
  const navigation = useNavigation();
  
  function handleNew() {
    navigation.navigate('players', {groups: 'Rocket'});
  }
  
  return (
    <Style.Container>
      <Header showBackButton />

      <Style.Content>
        <Style.Icon />
        <Highlight 
         title="Nova turma"
         subTitle="Crie uma tumar para adicionar pessoas!"/>
        
         <Input
          placeholder="Nome da turma" />
         
         <Button
         title="Criar"
         onPress={handleNew}
         />
      </Style.Content>
    </Style.Container>
  );
}
