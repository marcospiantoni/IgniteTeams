import * as Style from "./styles";
import { ButtonIcon } from '@components/ButtonIcon'

type Props = {
  name: string;
  onRemove: () => void;
};

export function PlayerCard({ name, onRemove}: Props) {
  return (
    <Style.Container>
      <Style.Icon
        name="person" 
      />
      <Style.Name>
        {name}
      </Style.Name>

      <ButtonIcon 
       icon="close"
       type="SECONDARY"
       onPress={onRemove}
      />

    </Style.Container>
  );
}
