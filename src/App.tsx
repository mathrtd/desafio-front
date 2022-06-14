import React from 'react';
import HeroCard from './components/HeroCard/HeroCard';
import SearchBar from './components/SearchBar/SearchBar';

export const App: React.FC = () => {
  return (
    <div className="App">
      abc
      <HeroCard
        imageUrl="https://portaldasmalas.com.br/blog-portal/wp-content/uploads/2019/01/bagagem-de-mao.jpg"
      />
    </div>
  );
}

export default App;
