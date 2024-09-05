import logo from "../../public/images/logo/logo.png";
import logo1 from "../../public/images/logo/logo1.png";
import logo2 from "../../public/images/logo/logo2.png";
import user1 from "../../public/images/user/user1.jpg";
import user2 from "../../public/images/user/user2.jpg";
import user3 from "../../public/images/user/user3.jpg";
import hero from "../../public/images/hero/Hero.png";
import hero1 from "../../public/images/hero/hero1.png";
import map from "../../public/images/cta/map.svg";
import map1 from "../../public/images/cta/map1.svg";

const logos = { logo, logo1, logo2 };
const users = { user1, user2, user3 };
const heros = { hero, hero1 };
const images = { ...logos, ...users, ...heros, map, map1 };

export { images };
