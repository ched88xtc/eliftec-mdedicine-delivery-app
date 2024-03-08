import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button, TextField } from "@mui/material";

interface IGoogleMapComponentProps {
  shopLocation: any;
  onAddressChange: (address: string) => void;
}

enum TravelMode {
  DRIVING = "DRIVING",
  WALKING = "WALKING",
  BICYCLING = "BICYCLING",
  TRANSIT = "TRANSIT",
}

export const GoogleMapComponent = ({
  shopLocation,
  onAddressChange,
}: IGoogleMapComponentProps) => {
  const [directions, setDirections] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: shopLocation.lat,
    lng: shopLocation.lng,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const getHumanReadableAddress = async (position: any) => {
    // Use the Geocoder to get the human-readable address
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: position }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        setInputValue(address); // Update input field with the address
        onAddressChange(address);
      } else {
        console.error(`Geocoding request failed due to ${status}`);
        setError("Please enter a valid address");
      }
    });
  };

  const onMapClick = async (event: any) => {
    const newMarker = {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      label: "New",
    };

    // Set the new marker as the only marker in the state
    setMarker(newMarker);

    // Calculate directions from the new marker to the shop marker
    calculateDirections(newMarker.position, shopLocation);

    // Get human-readable address for the new marker
    await getHumanReadableAddress(newMarker.position);
  };

  const calculateDirections = (origin: any, destination: any) => {
    // Use the DirectionsService to calculate the directions
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError("");
  };

  const handleInputSubmit = async () => {
    if (!inputValue.trim()) {
      setError("Please enter a valid address");
      return;
    }

    // Clear any previous error
    setError("");

    // Use the Geocoder to get the coordinates from the input address
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: inputValue }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        const newPosition = results[0].geometry.location;
        setMarker({ position: newPosition, label: "New" });
        calculateDirections(newPosition, shopLocation);
      } else {
        console.error(`Geocoding request failed due to ${status}`);
        setError("Please enter a valid address");
      }
    });
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}
        language="en"
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          options={options}
          onClick={onMapClick}
        >
          <Marker position={shopLocation} label="Drug store" />
          {marker && <Marker position={marker.position} label="Me" />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingTop: 30,
          paddingBottom: 30,
        }}
      >
        <TextField
          style={{
            position: "relative",
          }}
          FormHelperTextProps={{ sx: { position: "absolute", bottom: -24 } }}
          label="Address"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter address"
          helperText={error?.length > 0 && error}
          error={error?.length > 0}
        />
        <Button onClick={handleInputSubmit}>Add Pin</Button>
      </div>
    </div>
  );
};
