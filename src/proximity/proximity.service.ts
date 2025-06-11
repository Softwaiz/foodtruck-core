const EARTH_KM_IN_DEGREES = 111.2;

interface EarthPoint {
    lat: number;
    lon: number;
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
                min: center.lon - lonDelta,
                max: center.lon + lonDelta
            }
        }
    }


}