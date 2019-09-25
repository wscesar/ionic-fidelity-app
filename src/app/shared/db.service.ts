import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Place } from './place.model';
import { PlaceService } from './place.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    
    baseUrl = 'https://my-dummy-database.firebaseio.com/places.json';

    constructor(private http: HttpClient, private placeService: PlaceService) {}

    // storePlaces() {
    //     const places = this.placeService.getPlaces();
    //     this.http.put(this.baseUrl, places).subscribe();
    // }

    fetchPlaces() {
        return this.http
            .get<Place[]>(this.baseUrl)
            .pipe(
                map(places => {
                    return places.map(place => {
                        return {
                            ...place,
                            products: place.products ? place.products : []
                        };
                    });
                }),
                tap(places => {
                    this.placeService.setPlaces(places);
                })
            )
        }
}
