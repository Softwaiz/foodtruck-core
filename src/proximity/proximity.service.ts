const EARTH_KM_IN_DEGREES = 111.2;

export interface EarthPoint {
    lat: number;
    lng: number;
}

export class TruckProximityService {

    constructor() {}

    createBoundingBox(center: EarthPoint, radiusInKm: number) {
        let latDelta = radiusInKm / EARTH_KM_IN_DEGREES;
        let lonDelta = radiusInKm / (EARTH_KM_IN_DEGREES * Math.cos(center.lat * Math.PI / 180));

        return {
            lat: {
                min: center.lat - latDelta,
                max: center.lat + latDelta,
            },
            lon: {
                min: center.lng - lonDelta,
                max: center.lng + lonDelta
            }
        }
    }

}