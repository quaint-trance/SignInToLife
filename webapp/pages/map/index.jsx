import Head from 'next/head'
import styles from '../../styles/Map.module.css'
import Navbar from '../../components/Navbar'
import GoogleMapReact from 'google-map-react'
import useEvents from '../../hooks/useEvents'
import { Room, Add } from '@material-ui/icons'
import { MdAdd } from 'react-icons/md'
import { useState } from 'react'
import MapCard from '../../components/MapCard'
import MapSearchbar from '../../components/MapSearchbar'
import { useRouter } from 'next/router'
import { animated, useTransition } from 'react-spring'

const props = {
  center: {
    lat: 52.00,
    lng: 20.00
  },
  zoom: 7
}

function createMapOptions(maps) {
  return {
    zoomControlOptions: {
      position: -1,
      style: -1
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControl: false,
    fullscreenControl: false
  };
}

const LocationPin = ({ text, click}) => (
  <div className={styles.pin} onClick={click}>
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
          bootstrapURLKeys={{key: process.env.GMapsKey}}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          options={createMapOptions}
          
        >
          {events.map && !isError && events.map((e, i)=>
          e?.place && 
          <LocationPin
          lat={e.place.x}
          lng={e.place.y}
          click={()=>setCurrentPin(i)}
        />)}
         
        </GoogleMapReact>
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
            <button className={styles.add} onClick={()=>router.push('/map/addEvent')}><MdAdd /></button>
            <Navbar />
            😄</animated.div>
          )}</>
      }
      </main>

    </div>
  )
}
