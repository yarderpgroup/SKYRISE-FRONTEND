type Props = {
  name: string;
};

const Title = ({ name }: Props) => {
  return <h2 className="text-lg font-bold text-themeDarkGray">{name}</h2>;
};
export default Title;
