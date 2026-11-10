import Navbar from "./Navbar";

interface HeaderProps {
  showHamburger?: boolean;
}

export default function Header({ showHamburger }: HeaderProps) {
  return <Navbar showHamburger={showHamburger} />;
}
