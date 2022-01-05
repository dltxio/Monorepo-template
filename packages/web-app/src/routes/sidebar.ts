/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // The url
    icon: "HomeIcon", // The component being exported from icons/index.js
    name: "Dashboard" // Name that appear in Sidebar
  },
  {
    path: "/app/wallets",
    icon: "WalletIcon",
    name: "Wallets"
  },
  {
    path: "/app/community",
    icon: "UserGroupIcon",
    name: "Community"
  }
];

export default routes;
