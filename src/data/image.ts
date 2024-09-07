import logo from "../../public/images/logo/logo.png";
import logo1 from "../../public/images/logo/logo1.png";
import logo2 from "../../public/images/logo/logo2.png";
import buyer from "../../public/images/icons/buyer.svg";
import confirm from "../../public/images/icons/confirm.svg";
import delivery from "../../public/images/icons/delivery.svg";
import funds from "../../public/images/icons/funds.svg";
import tracker from "../../public/images/icons/tracker.svg";
import avataaars from "../../public/images/icons/avataaars.svg";
import avataaars1 from "../../public/images/icons/avataaars1.svg";
import newsletter from "../../public/images/icons/newsletter.svg";
import footerLogo from "../../public/images/logo/footerLogo.svg";
import user1 from "../../public/images/user/user1.jpg";
import user2 from "../../public/images/user/user2.jpg";
import user3 from "../../public/images/user/user3.jpg";
import hero from "../../public/images/hero/Hero.png";
import hero1 from "../../public/images/hero/hero1.png";
import map from "../../public/images/cta/map.svg";
import map1 from "../../public/images/cta/map1.svg";

const users = { user1, user2, user3 };
const heros = { hero, hero1 };
const logos = { logo, logo1, logo2, footerLogo };
const icons = { buyer, confirm, delivery, funds, tracker, avataaars, avataaars1, newsletter };
const images = { ...logos, ...users, ...heros, icons, map, map1 };

export { images };
