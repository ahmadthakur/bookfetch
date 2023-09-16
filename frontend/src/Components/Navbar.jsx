import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { SearchContext } from "../SearchContext";
import { useNavigate } from "react-router-dom";

function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.searchTerm.value;
    setSearchTerm(searchTerm);
    navigate("/search");
    console.log(searchTerm);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarItem isActive>
          <Link to="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/feedback" color="foreground">
            Feedback
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <form onSubmit={handleSubmit}>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchOutlinedIcon size={18} />}
            type="search"
            name="searchTerm"
          />
        </form>
      </NavbarContent>
      <NavbarMenu opened={isMenuOpen}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarComponent;
