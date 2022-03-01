import { atom } from "recoil";

export const rooms = atom({
  key: "rooms",
  default: [],
});

export const loader = atom({
  key: "loader",
  default: false,
});

export const booking = atom({
  key: "booking",
  default: {},
});
