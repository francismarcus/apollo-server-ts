import { Maybe } from "types";
import { ExpressRequest } from "interfaces";
import { Context } from "apollo-server-core";

import models from "./models";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

const getUser = (token: string): Maybe<object | string> => {
  try {
    if (token) {
      return jwt.verify(token, process.env.APP_SECRET);
    }
    return null;
  } catch (e) {
    return null;
  }
};

const context = ({ req }: { req: ExpressRequest }): Context => {
  const token = req.headers.authorization;
  const me = getUser(token);
  return {
    models,
    me,
  };
};

export default context;
