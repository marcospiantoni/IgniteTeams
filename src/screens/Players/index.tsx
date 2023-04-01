import { Header } from "@components/Header";
import * as Style from "./styles";
import { Highlight } from "@components/Highlight";

export function Players() {
  return (
    <Style.Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subTitle="Adicione a galera e separe os times"
      />
    </Style.Container>
  );
}
