import { createBrowserRouter } from "react-router";
import { Cover } from "./components/Cover";
import { May } from "./components/May";
import { June } from "./components/June";
import { July } from "./components/July";
import { August } from "./components/August";
import { September } from "./components/September";
import Rewind from "./pages/Rewind";
import { LocketWidget } from "./pages/LocketWidget";
import { Finale } from "./components/Finale";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Cover,
  },
  {
    path: "/may",
    Component: May,
  },
  {
    path: "/june",
    Component: June,
  },
  {
    path: "/july",
    Component: July,
  },
  {
    path: "/august",
    Component: August,
  },
  {
    path: "/september",
    Component: September,
  },
  {
    path: "/rewind",
    Component: Rewind,
  },
  {
    path: "/locket",
    Component: LocketWidget,
  },
  {
    path: "/finale",
    Component: Finale,
  },
]);