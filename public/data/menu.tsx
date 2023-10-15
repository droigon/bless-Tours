import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
export const menus = [
  
  {
    title: "Home",
    url: "/",
  },
  
  
  {
    title: "Tours",
    url: "/tours?page=1&limit=6",
  },
  {
    title: "About Us",
    url: "/about-us",
  },
  
  { title: "Faq", url: "/faq" },
  { title: "Contact Us", url: "/contact" },
 
   
  {
    title: "Dashboard",
    submenu: [
      {
        title: "User Dashboard",
        url: "/user/personal-info",
      },
      {
        title: "Vendor Dashboard",
        url: "/vendor-dashboard",
      },
      {
        title: "Admin Dashboard",
        url: "/admin-dashboard",
      },
    ],
  },
  
];
