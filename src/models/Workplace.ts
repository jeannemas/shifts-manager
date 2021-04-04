import { Entity } from './Entity';

export interface Workplace extends Entity {
  /** The workplace's name */
  name: string;

  /** The workplace's address, if any */
  address: string | null;

  /** The workplace's description, if any */
  description: string | null;
}
