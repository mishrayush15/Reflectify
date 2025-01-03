// Usign recoil for state management

import { atom } from "recoil"

export const barState = atom({
    key : "barState",
    default : false
})
export const touchState = atom({
    key : "touchState",
    default : false
})