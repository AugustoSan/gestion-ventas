import { FaHome } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { TbBottleFilled } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import SettingsIcon from '@mui/icons-material/Settings';
import { IItemMenu } from "../../main/interfaces";

const home:IItemMenu = {
    title: "Inicio",
    href: "/home",
    icon: <FaHome />
}

const clientes:IItemMenu = {
  title: "Clientes",
  href: "/clientes",
  icon: <BsFillPersonVcardFill />
}
const addCliente:IItemMenu = {
  title: "AddCliente",
  href: "/addCliente",
  icon: <BsFillPersonVcardFill />
}
const infoCliente:IItemMenu = {
  title: "infoCliente",
  href: "/infoCliente",
  icon: <BsFillPersonVcardFill />
}
const updateCliente:IItemMenu = {
  title: "updateCliente",
  href: "/updateCliente",
  icon: <BsFillPersonVcardFill />
}
const ingresos:IItemMenu = {
  title: "Pagos",
  href: "/ingresos",
  icon: <GiReceiveMoney />
}
const ventas:IItemMenu = {
  title: "Ventas",
  href: "/ventas",
  icon: <MdOutlinePointOfSale />
}
const productos:IItemMenu = {
  title: "Productos",
  href: "/productos",
  icon: <TbBottleFilled />
}
const pagos:IItemMenu = {
  title: "Pagos",
  href: "/pagos",
  icon: <GiReceiveMoney />
}
const settings:IItemMenu = {
  title: "Configuración",
  href: "/settings",
  icon: <SettingsIcon />
}
export const menuItems = {
  home,
  clientes,
  addCliente,
  infoCliente,
  updateCliente,
  ingresos,
  ventas,
  pagos,
  productos,
  settings
}

export const listMenuItems = [
  home,
  clientes,
  ingresos,
  ventas,
  productos
]
