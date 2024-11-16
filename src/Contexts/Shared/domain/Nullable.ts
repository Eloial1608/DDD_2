export type Nullable<T> = T | null | undefined;

export const isNullOrUndefined = (value?: any): value is null | undefined => value == null
