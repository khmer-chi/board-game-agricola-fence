import { InferInput, literal, union } from 'valibot';

export const ModeArray = ['square', 'edge', 'point'] as const;
export const ModeSchema = union(ModeArray.map((v) => literal(v)));
export type Mode = InferInput<typeof ModeSchema>;
