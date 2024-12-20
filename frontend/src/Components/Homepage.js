import {Link} from 'react-router-dom';
const Homepage = ()=>{
    return(
        <>
        <section className="main_contents">
            <div className="image_section">
                <img src="/image/sellingWeb.png" alt="showing few sample pic" />
            </div>
            <div className="text_section">
                <h1>Experience the Beauty of Nature Through Stunning Portraits</h1>
                <p>Explore breathtaking nature images for your space or as thoughtful gifts.</p>
                <Link to="/photosLists">Get Start</Link>
            </div>
        </section>
        </>
    )
}
export default Homepage;
