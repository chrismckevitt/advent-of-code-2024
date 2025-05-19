import { Operands } from "../types/operands.type.ts";

export const parseOperation = (operation: string): Operands => [
    Number.parseInt(
        operation.slice(
            operation.indexOf("(") + 1,
            operation.indexOf(","),
        ),
    ),
    Number.parseInt(
        operation.slice(
            operation.indexOf(",") + 1,
            operation.indexOf(")"),
        ),
    ),
];
