import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Style from "./styles";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: Style.ButtonIconTypeStyleProps;
};

export function ButtonIcon({ icon, type = "PRIMARY", ...rest }: Props) {
  return (
    <Style.Container {...rest}>
      <Style.Icon 
       name={icon} 
       type={type} />
    </Style.Container>
  );
}
