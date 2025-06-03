import { InferInput, literal, safeParse, union } from 'valibot';
export const PlaceArray = ['pastures', 'wooden-house', 'clay-house', 'stone-house', 'forest', 'swamp'] as const;
export const PlaceSchema = union(PlaceArray.map((v) => literal(v)));
export type Place = InferInput<typeof PlaceSchema>;
