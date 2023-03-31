import { TextInputProps } from "react-native";
import { useTheme } from 'styled-components/native';

import * as Style from "./styles";

export function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme();

  return <Style.Container 
    placeholderTextColor={COLORS.GRAY_300} 
    {...rest} />;
}
