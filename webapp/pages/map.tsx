import Head from 'next/head'
import styles from '../styles/Map.module.css'
import Navbar from '../components/Navbar'
import GoogleMapReact from 'google-map-react'

const props = {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
}


export default function Map() {
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
          bootstrapURLKeys={{key: 'AIzaSyCJeBzrM8qUxjsmQ6ZET_zqU9UVUMTUMD4'}}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
        </GoogleMapReact>
        </div>
        <Navbar />
      </main>

    </div>
  )
}
