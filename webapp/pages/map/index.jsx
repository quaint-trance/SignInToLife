import Head from 'next/head'
import styles from '../../styles/Map.module.css'
import Navbar from '../../components/Navbar'
import useEvents from '../../hooks/useEvents'
import { Room, Add } from '@material-ui/icons'
import { MdAdd } from 'react-icons/md'
import { useState, useEffect } from 'react'
import MapCard from '../../components/MapCard'
import MapSearchbar from '../../components/MapSearchbar'
import { useRouter } from 'next/router'
import { animated, useTransition } from 'react-spring'

import { MdPlace, MdGpsFixed } from 'react-icons/md'

import { GoogleMap, LoadScript, Marker, Circle, OverlayView } from '@react-google-maps/api';
const mapStyles = {        
  height: "100vh",
  width: "100%"
};

const LocationPin = ({ text, onClick}) => (
  <div className={styles.pin} onClick={onClick}>
    <Room />
  </div>
)


export default function Map() {
  
  
  const {isLoading, events, isError} = useEvents();
  const [currentPin, setCurrentPin] = useState();
  const router = useRouter();
  
const transitions = useTransition(currentPin, currentPin, {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 1 },
  config:{
    duration: 150
  }  
})

const [ currentPosition, setCurrentPosition ] = useState({});
const [ centerPosition, setCenterPosition ] = useState({lat: 52, lng: 20});
const [ zoomLevel, setZoomLevel ] = useState(13);
  
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => setCenterPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }));
  }, [])
  
  const center = () =>{
    setCenterPosition(JSON.parse(JSON.stringify(currentPosition)))
  }

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
        <LoadScript preventGoogleFontsLoading
          googleMapsApiKey={process.env.GMapsKey}>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={zoomLevel}
          center={centerPosition}>
          {
            currentPosition.lat &&
            ( 
              <OverlayView mapPaneName='floatPane' position={currentPosition} >
                <div className={styles.me}></div>
                </OverlayView>
            ) 
          }
          {
            events.map((item, index)=> {
              return (
                <Marker 
                  key={item.id}
                  position={item.location}
                  onClick={() => setCurrentPin(index)}
                />
              )
            })
         }
        </GoogleMap>

        </LoadScript>
        </div>
        { currentPin >= 0 
          ? <>
          {transitions.map(({ item, key, props }) => 
        <animated.div key={key} style={props}>
          <MapCard event={events[currentPin]} close={()=>setCurrentPin()} />
          😄</animated.div>
          )}
            

            {false && <MapCard event={events[currentPin]} close={()=>setCurrentPin()} />}
            </>
          : <>
          {transitions.map(({ item, key, props }) => 
            !item && <animated.div style={props}>
            <button className={styles.gps} onClick={center}><MdGpsFixed /></button>
            <button className={styles.add} onClick={()=>router.push('/map/addEvent')}><MdAdd /></button>
            <Navbar />
            😄</animated.div>
          )}</>
      }
      </main>

    </div>
  )
}
