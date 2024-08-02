import { IoIosHome } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
const ownerMenu =[
    {
        name : "Home",
        path : "/home",
        icon:<IoIosHome  size={35}/>
    },
    {
        name : "Uplode-Hostel",
        path : "/uplodehostel",
        icon:<FaBuilding size={35} />
    },
    {
        name : "Uplode-Mess",
        path : "/",
        icon:<GiMeal size={35}/>
    },
    {
        name : "My-Hostel",
        path : "/myhostel",
        icon:<GiMeal size={35}/>
    },
    {
        name : "Logout",
        path : "/logout",
        icon:<CiLogout size={35}/>
    }
]

export default ownerMenu;