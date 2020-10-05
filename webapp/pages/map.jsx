import Head from 'next/head'
import styles from '../styles/Map.module.css'
import Navbar from '../components/Navbar'
import GoogleMapReact from 'google-map-react'
import useEvents from '../hooks/useEvents'
import { Room } from '@material-ui/icons'
import { useState } from 'react'
import MapCard from '../components/MapCard'
import MapSearchbar from '../components/MapSearchbar'

const props = {
  center: {
    lat: 52.00,
    lng: 20.00
  },
  zoom: 7
}

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  console.log(maps.ControlPosition)
  console.log(maps.ZoomControlStyle)
  return {
    zoomControlOptions: {
      position: -1,
      style: -1
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControl: true
  };
}

const LocationPin = ({ text, click}) => (
  <div className={styles.pin} onClick={click}>
    <Room />
  </div>
)

export default function Map() {

  const {isLoading, events} = useEvents();
  const [currentPin, setCurrentPin] = useState();

  return (
    <div className={styles.container}>
      <Head>
        <title>Map</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta lang="en"></meta>
      </Head>

      <main className={styles.main}>
        <MapSearchbar />
        <div className={styles.mapContainer}  >
       <GoogleMapReact
          bootstrapURLKeys={{key: ''}}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          options={createMapOptions}
          
        >
          {events && events.map((e, i)=>
          <LocationPin
          lat={e.place.x}
          lng={e.place.y}
          click={()=>setCurrentPin(i)}
        />)}
         
        </GoogleMapReact>
        </div>
        { currentPin >= 0 
          ? <MapCard event={events[currentPin]} close={()=>setCurrentPin()} />
          : <Navbar />
      }
      </main>

    </div>
  )
}
