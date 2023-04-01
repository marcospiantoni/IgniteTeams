import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";

import * as Style from "./styles";

export function Players() {
  return (
    <Style.Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subTitle="Adicione a galera e separe os times"
      />
      <Style.Form>
        <Input 
         placeholder="Nome da pessoa" 
         autoCorrect={false} 
        />

        <ButtonIcon 
         icon="add" 
        />
      </Style.Form>

      <Filter 
      title="time a"
      
      />
  
    </Style.Container>
  );
}
