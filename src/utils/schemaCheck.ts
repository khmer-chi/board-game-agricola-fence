import { InferInput, safeParse } from 'valibot';

export const schemaCheck = <T extends Parameters<typeof safeParse>[0]>(
  schema: T,
  payload: Parameters<typeof safeParse>[1]
): InferInput<T> | false => {
  if (safeParse(schema, payload).success) return payload;
  return false;
};
