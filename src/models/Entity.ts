export interface Entity {
  /** The entity's id */
  id: string;

  /** @flag */
  _deleted?: boolean;
  /** @flag */
  _createdAt: number;
  /** @flag */
  _updatedAt: number;
}
