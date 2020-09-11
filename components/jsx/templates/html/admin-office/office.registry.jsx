import React from "react";
import { forms } from "./forms/form.registry";
var value = "content";
var path = "../content/content.registry";
import { content } from "../content/content.registry";

export const office = Object.assign({}, forms, content);


