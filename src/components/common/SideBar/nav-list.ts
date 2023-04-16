import { IconType } from "react-icons";
import { FaGamepad, FaMedal, FaUser } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import { MdDashboard, MdOutlineSportsVolleyball, MdStadium } from "react-icons/md";

interface NavItem {
    name: string;
    icon: IconType;
    path: string;
    children?: NavItem[];
}

const navList: NavItem[] = [
    { name: "Dashboard", icon: MdDashboard, path: "/admin/dashboard" },
    { name: "Games", icon: FaGamepad, path: "/admin/games" },
    { name: "Faculties", icon: HiLibrary, path: "/admin/faculties" },
    { name: "Sports", icon: MdOutlineSportsVolleyball, path: "/admin/sports" },
    { name: "Venues", icon: MdStadium, path: "/admin/venues" },
    { name: "Medals", icon: FaMedal, path: "/admin/medals" },
    { name: "Users", icon: FaUser, path: "/admin/users" }
]

export default navList;