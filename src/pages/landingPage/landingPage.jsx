import './landingPage.css'
import HeaderComponent from '../../components/header/header'
export default function LandingPage(){
    return (
        <>
            <HeaderComponent/>
            <div className='content-container'>
                <div className='content-middle-container'>
                    <h2 className='content-title' >Book your Vacations Plans with Ease</h2>
                    <p>Where You Headed?</p>
                    <input></input>
                    <div className='content-image-container'>

                    </div>
                </div>
            </div>
        </>
    )
}