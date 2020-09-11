import { forms } from "./forms/form.registry";
import { popin } from "./popin/popin.registry";
import { progress } from "./progress/progress.registry"

export const officeRegistry = Object.assign({}, forms, popin, progress); 