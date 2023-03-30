import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import * as Style from "./styles";

export function Groups() {
  return (
    <Style.Container>
      <Header />
      <Highlight 
        title="Turmas" 
        subTitle="Jogue com a sua turma!" />

      <GroupCard 
        title="Galera do Ignite!" />
    </Style.Container>
  );
}
