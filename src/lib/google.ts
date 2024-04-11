import { Loader } from "@googlemaps/js-api-loader";

const google = async () => {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: "weekly",
  });

  const { Map } = await loader.importLibrary("maps");
  const { Marker } = await loader.importLibrary("marker");
  const { PlacesService } = await loader.importLibrary("places");
  const { Point } = await loader.importLibrary("core");

  const position = {
    lat: 47.500229,
    lng: 8.72875,
  };

  const mapOptions = {
    center: position,
    zoom: 16,
    mapId: "1d3709bffc5c137f",
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
  };

  return { loader, Map, Marker, position, mapOptions, PlacesService, Point };
};

export default google;
