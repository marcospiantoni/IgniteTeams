import * as Style from "./styles";
import logoImg from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  return (
    <Style.Container>
      {showBackButton && (
        <Style.BackButton>
          <Style.BackIcon />
        </Style.BackButton>
      )}

      <Style.Logo source={logoImg} />
    </Style.Container>
  );
}
