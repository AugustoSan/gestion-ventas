import { FaHome } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { TbBottleFilled } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
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
const ingresos:IItemMenu = {
  title: "Abonos",
  href: "/ingresos",
  icon: <FaCircleDollarToSlot />
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
export const menuItems = {
  home,
  clientes,
  ingresos,
  ventas,
  pagos,
  productos
}

export const listMenuItems = [
  home,
  clientes,
  ingresos,
  ventas,
  pagos,
  productos
]
