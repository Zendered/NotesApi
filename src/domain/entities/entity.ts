import { randomUUID } from 'crypto';

export abstract class Entity<T> {
  constructor(public props: T, protected id?:string) {
    this.id = id ?? randomUUID();
  }
}
