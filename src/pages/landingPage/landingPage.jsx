import './landingPage.css'
import HeaderComponent from '../../components/header/header'
export default function LandingPage(){
    return (
        <>
            <HeaderComponent/>
            <div className='content-container'>
                <div className='content-title-container'>
                    <h2 className='content-title' >Book your Vacations Plans with Ease</h2>
                </div>   
            </div>
        </>
    )
}