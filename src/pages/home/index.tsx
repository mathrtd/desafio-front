import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "services/api_service";

const Home: React.FC = () => {
  useEffect(() => {
    getCharacters();
  })

  const getCharacters = async () => {
    let resp = await ApiService.api.get('characters');
  }
  
  return <div>
    Home
    <Link to="/details">ir para details</Link>
  </div>
}

export default Home;