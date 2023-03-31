import { TouchableOpacityProps } from "react-native";

import * as Style from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: Style.ButtonTypeStyleProps;
};

export function Button({title, type='PRIMARY', ...rest}: Props) {
  return (
   <Style.Container 
     type={type}
     {...rest}>
     <Style.Title>
       {title}
     </Style.Title>
   </Style.Container>
  );
}