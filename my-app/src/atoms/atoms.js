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

export const userProfile = atom({
  key: "userProfile",
  default: {
    email: "",
    password: "",
  },
});

export const userAccountAtom = atom({
  key: "userAccount",
  default: {
    firstName: "",
    surName: "",
    email: "",
    password: "",
  },
});

export const reservationAtom = atom({
  key: "reservation",
  default: {
    user: "",
    roomName: "",
    numberOfPeople: 1,
    startDate: "",
    endDate: "",
  },
});

export const roomIdAtom = atom({
  key: "roomId",
  default: null,
});
