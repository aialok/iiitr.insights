import { FloatingNav } from "../../components/ui/navbar-menu";

function NavbarComponent() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Use Cases",
      link: "/contact",
    },
  ];
  return (
    <div className="relative  w-full max-sm:hidden">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default NavbarComponent;
