export interface IBudgetPrices{
    flightAmount:       number;
    lodgeAmount:        number;
    foodAmount?:        number;
    activitiesAmount?:  number;
    otherAmount?:       number;
    total:              number;
}

export type ClasificationType= 'flights'| 'lodge' | 'food' | 'activities' | 'other';