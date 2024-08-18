export interface IVoiageLodge{
    lodgeId                      : number;
    lodgeName                    : string;
    description                  : string;
    checkIn                      : Date;
    checkOut                     : Date;
    nightPrice                   : number;
    latitude                     : number;
    longitude                    : number;
    totalRate                    : number;
    externalLink?                : string;
    images?                      : string;
    type                         : string;
    amenities?                   : string;
    total_price                  : number;
    
    //Propiedades de auditoria
    operational                  : boolean;
    creationDatetime             : Date;
    creationResponsible          : number;
    lastUpdateDatetime?          : Date;
    updateResponsible?           : number;
}


