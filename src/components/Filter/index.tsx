import { TouchableOpacityProps } from "react-native";

import * as Style from "./styles";

type Props = TouchableOpacityProps & Style.FilterStyleProps & {
    title: string;
  };

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Style.Container
      isActive={isActive}
      {...rest}>
      <Style.Title>
         {title}
      </Style.Title>
    </Style.Container>
  );
}
