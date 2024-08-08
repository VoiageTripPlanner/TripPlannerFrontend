export interface IVoiageLodge{
    lodge_id                     : number;
    lodge_name                   : string;
    description                  : string;
    check_in                     : Date;
    check_out                    : Date;
    night_price                  : number;
    latitude                     : number;
    longitude                    : number;
    totalRate                    : number;
    external_link?               : string;
    images?                      : string;
    type                         : string;
    amenities?                   : string;
    total_price                  : number;
    
    //Propiedades de auditoria
    operational                   : boolean;
    creation_datetime             : Date;
    creation_responsible          : number;
    lastUpdate_datetime?          : Date;
    update_responsible?           : number;
}


