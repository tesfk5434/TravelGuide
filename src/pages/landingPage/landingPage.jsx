import './landingPage.css'
import HeaderComponent from '../../components/header/header'
import Globe from 'react-globe.gl';
import Map from '../../images/2979562.webp'
import { useEffect, useRef } from 'react';
export default function LandingPage(){
    const globeEl = useRef();
    useEffect( () =>{
        const globeControl = globeEl.current.controls();
        globeControl.autoRotate = true;
        globeControl.autoRotateSpeed = 1;
    }, [])
    return (
        <>
            <HeaderComponent/>
            <div className='content-container'>
                <div className='content-middle-container'>
                    <h2 className='content-title' >Book your Vacations Plans with Ease</h2>
                    <p>Where You Headed?</p>
                    <input></input>
                    <div className='content-image-container'>
                        <Globe ref={globeEl} globeImageUrl={Map} backgroundColor='white' animateIn={false} height={400} width={400} atmosphereColor='black'/>
                    </div>
                </div>
            </div>
        </>
    )
}