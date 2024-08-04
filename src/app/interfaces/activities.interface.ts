export interface IActivity{

    id?: string;  
    address: string;
    name?: string;
      imageUrl?: string;
      latitude?: number;
      longitude?: number;
      iconUrl?: string;
      location?: google.maps.LatLng;
      rating?: number;
      types?: string[];
      pricelevel?: number;
      website?: string;
}

export interface IReview{
    rating: number;
    review: string;
    user: string;
    date: string;
}