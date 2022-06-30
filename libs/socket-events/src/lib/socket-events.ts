import { Driver } from '@spa-nodejs/model';

export interface ServerEvents {
  'drivers:update': (res: EventResponse<Driver>) => void;
}

export interface EventResponse<T> {
  data: T[];
}
