
import { UNLOCK_WALLET, LOCK_WALLET } from "./types";
import { createAction, ActionsUnion } from "../helpers";


export const unlockWallet = (passprhrase: string) => createAction(UNLOCK_WALLET, passprhrase);
export const lockWallet = () => createAction(LOCK_WALLET);

export const AuthActions = {
    unlockWallet,
    lockWallet,
}

export type AuthActions = ActionsUnion<typeof AuthActions>;
