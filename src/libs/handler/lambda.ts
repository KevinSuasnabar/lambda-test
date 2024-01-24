import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { Context, Callback } from "aws-lambda";

export const middyfy = (
  handler:
    | middy.PluginObject
    | ((
        event: unknown,
        context: Context,
        callback: Callback<any>,
      ) => void | Promise<any>),
) => {
  return middy(handler).use(middyJsonBodyParser());
};
