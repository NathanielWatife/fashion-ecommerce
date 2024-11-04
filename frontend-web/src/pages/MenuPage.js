import header from './images/header.jpg';
function MenuPage() {
    return (
        <div className="menu-section">
            <div className="menu-banner">
                <div className="menu-title">
                    <h1 className='menu-tag'>Shop More <br></br> Get More</h1>
                    <p className='menu-desc'>We will help you to make an elegant and luxurious interior designed by professional interior designer.</p>
                </div>
                {/* menu image */}
                <div className="menu-image">
                    <img src={header} className='header-image' alt='header' />
                </div>
            </div>
        </div>
    );
}

export default MenuPage;