export interface ICalendarEvent{   
    eventId                     : number;
    title                       : string;
    description                 : string;
    eventDate                   : Date;
    eventType                   : eventCategory;
    operational                 : boolean;
    creation_datetime           : Date;
    creation_responsible        : number
    last_update_datetime?       : Date;
    update_responsible?         : number;
    
    
}

export type eventCategory   = 'Activity' | 'Restaurant' | 'Flight' | 'Other';