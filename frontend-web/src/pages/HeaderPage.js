// Creating a function for Header Navbar 
import './PageStyles.css';
function HeaderPage(){
    return (
        <div>
			{/* header */}
            <header className="App-header">
				{/* navbar */}
               <nav className="nav-bar">
					<div className="logo">
						<a href="">fun.<span>niture</span></a>
					</div>
					<div className="order-list">
						<a href="" className="nav-list">Home</a>
						<a href="" className="nav-list">About</a>
						<a href="" className="nav-list">Products</a>
						<a href="" className="nav-list">Contact</a>
					</div>

					<div className="reg-list">
						<a href="" className="user-list">SignUp</a>
						<a href="" className="user-list">Login</a>
					</div>

					<div className="cart-list">
						<a href="" className="cart-link">cart</a>
					</div>
               </nav> 
            </header>
        </div>
    );
};
export default HeaderPage;