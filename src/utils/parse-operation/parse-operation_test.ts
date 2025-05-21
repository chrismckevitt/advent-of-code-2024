import { assertEquals } from "jsr:@std/assert";

import { parseOperation } from "./parse-operation.ts";

Deno.test("parseOperation", () => {
  assertEquals(parseOperation("add(5,10)"), [5, 10]);
  assertEquals(parseOperation("subtract(20,7)"), [20, 7]);
  assertEquals(parseOperation("multiply(-3,4)"), [-3, 4]);
  assertEquals(parseOperation("divide(10,-2)"), [10, -2]);
  assertEquals(parseOperation("operation(-5,-8)"), [-5, -8]);
  assertEquals(parseOperation("function(0,0)"), [0, 0]);
  assertEquals(parseOperation("calculate(1234,5678)"), [1234, 5678]);
  assertEquals(parseOperation("veryLongOperationName(42,99)"), [42, 99]);
  assertEquals(parseOperation("(1,2)"), [1, 2]);
});
