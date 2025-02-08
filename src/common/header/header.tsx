import { Link } from 'react-router-dom';

function NavigationMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light col-12">
      <div className='container'>
        <Link className="navbar-brand" to="/">
          Sci-Arguminer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">
                Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                Past Results
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;