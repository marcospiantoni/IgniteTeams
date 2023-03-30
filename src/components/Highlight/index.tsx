import * as Style from "./styles";

type Props = {
  title: string;
  subTitle: string;
};

export function Highlight({ title, subTitle }: Props) {
  return (
    <Style.Conteiner>
      <Style.Title>
         {title}
      </Style.Title>
      <Style.SubTitle>
        {subTitle}
      </Style.SubTitle>
    </Style.Conteiner>
  );
}
