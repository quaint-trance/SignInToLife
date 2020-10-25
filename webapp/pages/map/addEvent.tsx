import Head from 'next/head'
import useAddEvent from '../../hooks/useAddEvent'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserContext'
import { useRouter } from 'next/router'
import useLoginAccess from '../../hooks/useLoginAccess'
import { ArrowBack, Check, Close } from '@material-ui/icons'
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';
import styled, { keyframes } from 'styled-components'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const mapStyles = {        
  height: "90vh",
  width: "100%"
};

const bgAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  background-size: 400% 400%;
  animation: ${bgAnimation} 8s infinite;
  color: white;
  display: grid;
  grid-template-rows: auto 1fr auto 1fr;

  & > main{
    grid-row: 3 / 4;
  }
`

const Header = styled.header`
  color: white;
  background-color: #000000;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  & > i{
    padding: 0 10px;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;

  & > input, & > textarea{
    outline: 'none';
    border-radius: 10px;
    border: 2px solid ${({error}: {error: boolean}) => error ? `red` : `white`};
    margin: 0 0 30px 0;
    font-size: 1.2rem;
    padding: 10px;
  }
  & > textarea{
    height: 10rem
  }

  & > label{
      color: ${({error}: {error: boolean}) => error ? `red` : `white`}
    }
`

const CreateButton = styled.button`
    outline: none;
    position: relative;
    background-color: white;  
    border: none;
    color: rgba(0, 0, 0, 0.952);
    border-radius: 15px;
    font-size: 1.3rem;
    font-weight: 500;
    width: 100%;
    line-height: 10vw;
    padding: 10px 10px;
    margin-bottom: 10px;

    &:touch-action{
      transform: scale(.95)
    }

    & > span {
        background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
        -webkit-text-fill-color: transparent; 
        -webkit-background-clip: text;
        background-clip: text;
        font-weight: 900;
      }
`

const ChooseButton = styled(CreateButton)`
  color: white;
  border: 5px solid white;
  background-color: transparent;
  & > span {
        background: initial;
        -webkit-text-fill-color: initial; 
        -webkit-background-clip: initial;
        background-clip: initial;
        font-weight: 600;
      }
`

const OkButton = styled(ChooseButton)`
  position: fixed;
  bottom: 0;
  background: linear-gradient(60deg, rgba(101,208,92,1) 17%, rgba(51,194,101,1) 60%, rgba(65,215,160,1) 95%);
  color: white;
  margin: 0;
  border: 0;
`

const MeMarker = styled.div`
  height: 20px;
  width: 20px;
  background-color: rgb(44, 129, 226);
  border: 3px solid white;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.342);
`


function AddEvent() {
  
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

return choosing ? (
    <div>
    <Head>
      <title>Add Event</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header>
      <i><MdKeyboardArrowLeft onClick={()=>router.back()}></MdKeyboardArrowLeft></i>
      <span>Create new event</span>
    </Header>

    <LoadScript preventGoogleFontsLoading
            googleMapsApiKey={process.env.GMapsKey}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={centerPosition}
            >
            {centerPosition.lat && ( 
              <OverlayView mapPaneName='floatPane' position={centerPosition} >
                <MeMarker></MeMarker>
              </OverlayView>
            )}
            <Marker
              position={markerPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true}
            />
          </GoogleMap>
          </LoadScript>
          <OkButton onClick={()=>setChoosing(false)}>OK</OkButton>
  </div>
  ):(
    <Container>
      <Head>
        <title>Add Event</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <i><MdKeyboardArrowLeft onClick={()=>router.back()}></MdKeyboardArrowLeft></i>
        <span>Create new event</span>
      </Header>

      <main>
        <Form onSubmit={handleFormSubmit} error={false}>
            
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description"/>
            
            <ChooseButton onClick={()=>setChoosing(true)}> <span>choose point on map </span></ChooseButton>

            <CreateButton> <span>create event</span></CreateButton>

            <div> 
              {isSuccess && <div><Check/></div>}
              {isError && <div><Close/></div>}
              {isLoading && <div></div>}
            </div>
        </Form>
      </main>
    </Container>
  )
}

export default AddEvent;