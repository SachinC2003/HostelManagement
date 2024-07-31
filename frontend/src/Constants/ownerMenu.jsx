import { IoIosHome } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
const ownerMenu =[
    {
        name : "Home",
        path : "/courses",
        icon:<IoIosHome  size={35}/>
    },
    {
        name : "Uplode-Hostel",
        path : "/uplodehostel",
        icon:<FaBuilding size={35} />
    },
    {
        name : "Uplode-Mess",
        path : "/updatehostel",
        icon:<GiMeal size={35}/>
    },
    {
        name : "Logout",
        path : "/logout",
        icon:<CiLogout size={35}/>
    }
]

export default ownerMenu;