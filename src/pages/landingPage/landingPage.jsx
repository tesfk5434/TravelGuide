import './landingPage.css'
import HeaderComponent from '../../components/header/header'
import Globe from 'react-globe.gl';
import Map from '../../images/2979562.webp'
import Plane from '../../images/plane.jpg'
import Vacation from '../../images/vacation.jpg'
import hawaii from '../../images/hawaii.jpeg'
import { useEffect, useRef, useState } from 'react';
export default function LandingPage(){
    const [userSearch, setUserSearch] = useState('');
    const [locations, setLocations] = useState([]);
    const globeEl = useRef();
    useEffect( () =>{
        const globeControl = globeEl.current.controls();
        globeControl.autoRotate = true;
        globeControl.autoRotateSpeed = 1;
    }, [])
    useEffect( () =>{
        const timer = setTimeout(async () =>{
            if (userSearch !== ''){
                const backendResponse = await fetch('http://localhost:3000/locations',{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        query: userSearch,
                    })
                })
                const locationData = await backendResponse.json();
                if (locationData.status === 'success'){
                    setLocations(locationData.data.locations);
                }
            }
            else{
                setLocations([]);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [userSearch])    
    return (
        <>
            <HeaderComponent/>
            <div className='content-container'>
                <div className='content-side-container'>
                    <div className='side-container-half'>
                        <h2 className='side-title'>Trending</h2>
                        <ol>
                            <li className='trending-item'>Toronto, Canada</li>
                            <li className='trending-item'>Los Angeles, United States</li>
                            <li className='trending-item'>New York, United States</li>
                            <li className='trending-item'>Hawaii, United States</li>
                            <li className='trending-item'>Vancouver, Canada</li>
                        </ol>
                    </div>
                    <div className='side-container-half'>
                        <img style={{width:'100%', height: '80%',}} src={Plane}/>
                    </div>

                </div>
                <div className='content-middle-container'>
                    <h2 className='content-title' >Book your Vacations Plans with Ease</h2>
                    <p>Where You Headed?</p>
                    <input onChange={(e) => setUserSearch(e.target.value)}></input>
                    <div className='locations-overlay'>
                    {Array.isArray(locations) && locations.map((value, i) => (
                        <p style={{borderBottom:"solid grey 2px",textAlign:'left', textShadow:'0 0'}} key={i}>{value.displayName.text}</p>
                    ))}
                    </div>
                    <div className='content-image-container'>
                        <Globe ref={globeEl} globeImageUrl={Map} backgroundColor='white' animateIn={false} height={250} width={250} atmosphereColor='black'/>
                    </div>
                </div>
                <div className='content-side-container'>
                    <div className='side-container-half'>
                        <img style={{width:'100%', height:'100%'}} src={Vacation}/>
                    </div>
                    <div className='side-container-half'>
                        <img style={{width:'100%', height:'80%'}} src={hawaii}/>
                    </div>
                </div>
            </div>
        </>
    )
}