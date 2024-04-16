import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="banner">
        <h1>Melting Pot</h1>
        <h2>Let&apos;s Make Some Money 💪🏼</h2>
        <Link to="/board">
          <button>Enter Site</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
