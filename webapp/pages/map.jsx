import Head from 'next/head'
import styles from '../styles/Map.module.css'
import Navbar from '../components/Navbar'
import GoogleMapReact from 'google-map-react'
import useEvents from '../hooks/useEvents'
import { Room } from '@material-ui/icons'

const props = {
  center: {
    lat: 52.00,
    lng: 20.00
  },
  zoom: 7
}

const LocationPin = ({ text }) => (
  <div className={styles.pin}>
    <Room />
  </div>
)

export default function Map() {

  const {isLoading, events} = useEvents();
  return (
    <div className={styles.container}>
      <Head>
        <title>Map</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta lang="en"></meta>
      </Head>

      <main className={styles.main}>
        <div className={styles.mapContainer}  >
       <GoogleMapReact
          bootstrapURLKeys={{key: ''}}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
          {events && events.map(e=>
          <LocationPin
          lat={e.place.x}
          lng={e.place.y}
          text={e.name}
        />)}
         
        </GoogleMapReact>
        </div>
        <Navbar />
      </main>

    </div>
  )
}
