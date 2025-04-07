import { BookingMeetingLocationDto } from "@/data/dto/companion.data.dto";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  location: {
    lat: () => number | number;
    lng: () => number | number;
  };
}

interface GoogleAddress {
  address_components: AddressComponent[];
  geometry: Geometry;
  formatted_address: string;
}

export const extractAddressComponent = (googleadress: GoogleAddress) => {
  let city: string | null = null;
  let state: string | null = null;
  const address = googleadress.address_components;
  for (let i = 0; i < address.length; i += 1) {
    if (address[i].types.includes("locality")) {
      city = address[i].long_name;
    } else if (address[i].types.includes("administrative_area_level_1")) {
      state = address[i].long_name;
    }
  }
  const lat =
    typeof googleadress.geometry.location.lat === "function"
      ? googleadress.geometry.location.lat()
      : googleadress.geometry.location.lat;
  const lng =
    typeof googleadress.geometry.location.lng === "function"
      ? googleadress.geometry.location.lng()
      : googleadress.geometry.location.lng;
  const formattedaddress = googleadress.formatted_address;
  return { lat, lng, formattedaddress, city, state };
};

// Extend the Window interface to include the google property
export const loadGoogleMapsScript = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_KEY;
  return new Promise<void>((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        console.error("Google Maps API Failed to Load");
        reject("Google Maps API failed to load.");
      };
      document.body.appendChild(script);
    }
  });
};

export const getLocationDetails = (
  query: string,
  mapId: string
): Promise<BookingMeetingLocationDto> => {
  return new Promise<any>((res) => {
    if (!query || !query.trim().length || query.length < 4) {
      return res([]);
    }

    const mumbai = new window.google.maps.LatLng(19.076, 72.8777);
    const map = new window.google.maps.Map(
      document.getElementById(mapId) as HTMLElement,
      {
        center: mumbai,
        zoom: 16,
      }
    );
    const request = {
      query,
      fields: ["name", "formatted_address", "place_id", "geometry", "types"],
    };
    let finalResult = null;
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results?.length &&
        results[0].place_id
      ) {
        service.getDetails(
          {
            placeId: results[0].place_id,
            fields: [
              "name",
              "formatted_address",
              "place_id",
              "geometry",
              "address_components",
              "photos",
            ],
          },
          (place, status) => {
            if (
              !place ||
              status !== window.google.maps.places.PlacesServiceStatus.OK
            ) {
              return res(null);
            }
            const photo = place.photos?.[0]?.getUrl() || "";
            finalResult = {
              ...extractAddressComponent(place as GoogleAddress),
              name: place.name,
              userInput: query,
              googleextra: {
                photo,
                place_id: place.place_id,
                placeType: results[0].types,
              },
            };
            if (place.geometry?.location) {
              const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
              });
              const infoWindow = new google.maps.InfoWindow({
                content: `<div>
                    <img src=${photo} style="width:11.25rem; height:6.25rem"></img>
                    <h1 style="font-weight: 700; font-size: 1.2rem;">${
                      place.name || ""
                    }</h1>
                    <p>This place is type of ${
                      results[0].types?.length && results[0].types[0]
                    }</p></div>`,
              });
              marker.addListener("click", function () {
                infoWindow.open(map, marker);
              });
              map.setCenter(place.geometry.location);
              res(finalResult);
            }
          }
        );
      } else {
        res(null);
      }
    });
  });
};
