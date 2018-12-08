
import { AUTH_TYPES } from "./auth/types";
import { SETTINGS_TYPES } from "./settings/types";
import { AuthActions } from "./auth/actions";
import { SettingsActions } from "./settings/actions";


export const Actions = {
    ... AuthActions,
    ...SettingsActions,
};

export type Actions = AuthActions | SettingsActions;
export type ActionsType = AUTH_TYPES | SETTINGS_TYPES;
