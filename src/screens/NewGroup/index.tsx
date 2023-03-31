import { Highlight } from "@components/Highlight";
import * as Style from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {
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
         title="Criar"/>
      </Style.Content>
    </Style.Container>
  );
}
