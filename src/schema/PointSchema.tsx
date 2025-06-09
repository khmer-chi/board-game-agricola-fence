import { type InferInput, number, object } from "valibot";

const PointSchema = object({
  x: number(),
  y: number(),
});
export type Point = InferInput<typeof PointSchema>;
