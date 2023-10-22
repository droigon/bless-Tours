export const sidenavData = [
  
  {
    id: 2,
    name: "Tour",
    icon: <i className="las la-umbrella text-2xl"></i>,
    submenus: [
      { url: "/tour/all-tour", title: "All Tours" },
      
      { url: "/tour/booking-calendar", title: "Booking Calendar" },
      
    ],
  },
 
 

  {
    id: 10,
    name: "Guests",
    icon: <i className="las la-user-circle text-2xl"></i>,
    submenus: [
      { url: "/guest/guests-list", title: "Guests List" },
    ],
  },
  {
    id: 11,
    name: "Agents",
    icon: <i className="las la-user-friends text-2xl"></i>,
    submenus: [
      { url: "/agent/agents-list", title: "Agents List" },
      { url: "/agent/agents-details", title: "Agents Details" },
    ],
  },
  {
    id: 12,
    name: "Chat",
    icon: <i className="las la-sms text-2xl"></i>,
    url: "/chat",
  },
  {
    id: 13,
    name: "Reviews",
    icon: <i className="lar la-star text-2xl"></i>,
    url: "/reviews",
  },
  {
    id: 14,
    name: "Coupon",
    icon: <i className="las la-ticket-alt text-2xl"></i>,
    url: "/coupon",
  },
  {
    id: 15,
    name: "Total Earnings",
    icon: <i className="las la-hand-holding-usd text-2xl"></i>,
    submenus: [
      { url: "/earning/tax-calculate", title: "Tax Calculate" },
      { url: "/earning/subscription-earn", title: "Subscription Earn" },
      { url: "/earning/withdraw-earn", title: "Withdraw Earn" },
      { url: "/earning/commission-earn", title: "Commission Earn" },
    ],
  },

];
