import { IoIosHome } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
const userMenu = [
    {
        name : "Home",
        path : "/home",
        icon:<IoIosHome  size={35}/>
    },
    {
        name : "Hostel",
        path : "/hostel",
        icon:<FaBuilding size={35} />
    },
    {
        name : "Mess",
        path : "/mess",
        icon:<GiMeal size={35}/>
    },
    {
        name : "Logout",
        path : "/logout",
        icon:<CiLogout size={35}/>
    }
]

export default userMenu;