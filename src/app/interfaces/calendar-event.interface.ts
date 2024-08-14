export interface ICalendarEvent{   
    eventId            : number;
    title              : string;
    description        : string;
    eventDate          : Date;
    userId             : number; 
    eventType          : eventCategory;
    operational        : boolean;
    
    
}

export type eventCategory   = 'Activity' | 'Restaurant' | 'Flight' | 'Other';