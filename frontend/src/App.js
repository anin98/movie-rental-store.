import RegistrationForm from "./components/auth/RegistrationForm";
import LoginForm from "./components/auth/LoginForm";
import Logout from "./components/auth/logout";
import MovieGrid from "./components/movies/moviedetails";
import ReviewForm from "./components/movies/review";
import AllReviews from "./components/movies/allreviews"
import Layout from "./Layout";
import Home from "./Home";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './Default';

const container = document.getElementById('root');
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/movies" element={<MovieGrid />} />
          {/* <Route path="/movies/:id" component={MovieList} /> */}
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/allreviews" element={<AllReviews />} />
          <Route path="/" element={<Default />} />
          {/* protected routes */}
          <Route path="/Home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
