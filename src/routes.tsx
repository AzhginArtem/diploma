import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Contracts from "./pages/Contracts"
import Main from "./pages/Main"
import Objects from "./pages/Objects"
import Owners from "./pages/Owners"
import Services from "./pages/Services"
import Stats from "./pages/Stats"
import Types from "./pages/Types"
import Users from "./pages/Users"
import { ADMIN_ROUTE, AUTH_ROUTE, CONTRACTS_ROUTE, MAIN_ROUTE, OBJECTS_ROUTE, OWNERS_ROUTE, SERVICES_ROUTE, STATS_ROUTE, TYPES_ROUTE, USERS_ROUTE } from "./store/consts"

export const authRoutes = [
  {
    path: CONTRACTS_ROUTE,
    Component: Contracts
  },
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: OBJECTS_ROUTE,
    Component: Objects
  },
  {
    path: OWNERS_ROUTE,
    Component: Owners
  },
  {
    path: SERVICES_ROUTE,
    Component: Services
  },
  {
    path: TYPES_ROUTE,
    Component: Types
  },
  {
    path: USERS_ROUTE,
    Component: Users
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: STATS_ROUTE,
    Component: Stats
  }
]

export const publicRoutes = [
  {
    path: AUTH_ROUTE,
    Component: Auth
  },
]