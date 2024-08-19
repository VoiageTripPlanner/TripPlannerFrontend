export interface IAudit{

    //Propiedades de auditoria
    creation_datetime         : Date;
    creation_responsible      : number;
    lastUpdate_datetime?      : Date;
    update_responsible?       : number;
}