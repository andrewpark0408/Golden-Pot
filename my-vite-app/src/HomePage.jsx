import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <div className="banner">
        <h1>Melting Pot</h1>
        <Link to="/board">
          <button>Enter Site</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
