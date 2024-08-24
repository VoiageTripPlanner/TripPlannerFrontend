export interface IAudit {
  creationResponsible: number;
  creationDatetime: Date;
  updateResponsible?: number;
  lastUpdateDatetime?: Date;
}
