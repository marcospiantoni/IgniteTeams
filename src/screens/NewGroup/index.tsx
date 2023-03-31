import { Highlight } from "@components/Highlight";
import * as Style from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";

export function NewGroup() {
  return (
    <Style.Container>
      <Header showBackButton />

      <Style.Content>
        <Style.Icon />
        <Highlight 
         title="Nova turma"
         subTitle="Crie uma tumar para adicionar pessoas!"/>

         <Button
         title="Criar"/>
      </Style.Content>
    </Style.Container>
  );
}
