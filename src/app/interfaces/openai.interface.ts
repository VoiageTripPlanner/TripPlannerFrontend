export interface IAISuggestion {
    startDate:         Date;
    endDate:           Date;
    currency:          string;
    totalEstimate:     number;
    destination:       string;
    activityEstimates: IActivityEstimate[];
}

export interface IActivityEstimate {
    name:          string;
    address:       string;
    location:      string;
    priceEstimate: number;
}
