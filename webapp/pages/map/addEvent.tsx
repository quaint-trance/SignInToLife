import Head from 'next/head'
import useAddEvent from '../../hooks/useAddEvent'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserContext'
import styles from '../../styles/AddEvent.module.css'
import { useRouter } from 'next/router'
import useLoginAccess from '../../hooks/useLoginAccess'
import { ArrowBack, Check, Close } from '@material-ui/icons'
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';

const mapStyles = {        
  height: "90vh",
  width: "100%"
};

export default function Login() {
  
    const { token } = useContext( UserContext );
    const { add, isLoading, isError, isSuccess } = useAddEvent(token);
    const [ centerPosition, setCenterPosition ] = useState({lat: 52, lng: 20});
    const [ markerPosition, setMarkerPosition ] = useState({lat: 52, lng: 20});
    const [choosing, setChoosing] = useState(false);
    
    useLoginAccess();
    const router = useRouter();

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        add(event.target.name.value, new Date(), {x: `${markerPosition.lat}`, y: `${markerPosition.lng}`}, event.target.description.value);
    }

    const onMarkerDragEnd = (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng})
    }

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const c = {lat: position.coords.latitude,
        lng: position.coords.longitude}
        setCenterPosition(c)
        setMarkerPosition(c);
      }
      );
    }, [])

  if(choosing) return(
    <div className={styles.container}>
    <Head>
      <title>Add Event</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className={styles.header}>
      <ArrowBack onClick={()=>router.back()}></ArrowBack>
        <img src="/images/logo.png" alt="logo"/>
    </header>

    <LoadScript preventGoogleFontsLoading
            googleMapsApiKey={process.env.GMapsKey}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={centerPosition}
            >
            {centerPosition.lat && ( 
              <OverlayView mapPaneName='floatPane' position={centerPosition} >
                <div className={styles.me}></div>
              </OverlayView>
            )}
            <Marker
              position={markerPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true}
            />
          </GoogleMap>
          </LoadScript>
          <button className={styles.chooseF} onClick={()=>setChoosing(false)}>OK</button>
  </div>
  )

    return (
    <div className={styles.container}>
      <Head>
        <title>Add Event</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <ArrowBack onClick={()=>router.back()}></ArrowBack>
          <img src="/images/logo.png" alt="logo"/>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create new event
        </h1>
        <form className={styles.form} onSubmit={handleFormSubmit} >
            
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description"/>
            
            <button className={styles.choose} onClick={()=>setChoosing(true)}>choose point on map</button>

            <button className={styles.button}>create event</button>

            <div> 
              {isSuccess && <div className={styles.done}><Check/></div>}
              {isError && <div className={styles.error}><Close/></div>}
              {isLoading && <div className={styles.loading}></div>}
               
              
            </div>
        </form>
      </main>
    </div>
  )
}