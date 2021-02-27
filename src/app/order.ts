import { DataEntity } from 'platy-lib/lib/entities/data-entity.d';

export class Order implements DataEntity{
  id: string | number;
  name: string;
}
