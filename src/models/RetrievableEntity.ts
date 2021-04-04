export type RetrievableEntity<E = Record<string, unknown>> = E & {
  /** The entity's id */
  id: string;
};
