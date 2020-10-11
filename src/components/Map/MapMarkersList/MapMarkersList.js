import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const mapMarkersList = (props) => {
  const markers = props.data.map((item) => {
    const position = [item.countryInfo.lat, item.countryInfo.long];
    return (
      <Marker
        position={position}
        key={item.country}
        onclick={() => props.clicked(item.country)}
        onMouseOver={(e) => {
          e.target.openPopup();
        }}
        onMouseOut={(e) => {
          e.target.closePopup();
        }}
      >
        <Popup>{`${item.country}: Today's cases: ${item.todayCases}`}</Popup>
      </Marker>
    );
  });
  return markers;
};

export default mapMarkersList;
