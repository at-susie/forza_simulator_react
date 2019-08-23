import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYXQtc3VzaGkiLCJhIjoiY2p5MDR6cjQ0MDNlNzNubXF1eGpsOXcxaSJ9.tvGwEbcBsITaUsWKmRYecg"
});
class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      markerPositionLat: -2.293,
      markerPositionLng: 54.525
    }
  }

  componentDidMount() {
   
  }

  render() {

    return (
      <Map
        style="mapbox://styles/at-sushi/cjy05w8pm0zub1cqnkbgt0anp"
        center={[this.state.markerPositionLat, this.state.markerPositionLng]}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}>
        <Layer
          type="raster"
          layout={{ "icon-image": "harbor-15" }}>
        </Layer>
        <Marker
          coordinates={[this.state.markerPositionLat, this.state.markerPositionLng]}
          anchor="bottom">
          <div className="map_marker"></div>
        </Marker>
      </Map>
    );
  }
}