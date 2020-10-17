import { ETokenType } from "../types/token";

export const tokenConfig = {
  access: {
    type: ETokenType.TOKEN_TYPE_ACCESS,
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  },

  refresh: {
    type: ETokenType.TOKEN_TYPE_REFRESH,
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  },
};
