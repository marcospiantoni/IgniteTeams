import * as Style from './styles'
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps &{
  title: string;
}

export function GroupCard({title, ...rest}: Props){
  return (
   <Style.Container {...rest}>
    <Style.Icon />
    <Style.Title>
       {title}
    </Style.Title>
   </Style.Container>
  )
}
