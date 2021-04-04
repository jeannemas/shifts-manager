import { Entity } from './Entity';
import { RetrievableEntity } from './RetrievableEntity';
import { Workplace } from './Workplace';

export interface Shift extends Entity {
  /** The shift's workplace id, if any */
  workplaceId: RetrievableEntity<Workplace>['id'] | null;

  /** The shift's start time */
  startTime: number;

  /** The shift's end time, if any */
  endTime: number | null;

  /** The shift's title */
  title: string;

  /** The shift's description, if any */
  description: string | null;
}
