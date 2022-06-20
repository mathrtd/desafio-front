import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './pages/details';
import Home from './pages/home';
import { AppWrapper } from './styles';

export const App: React.FC = () => {
  return (
		<AppWrapper>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route element={<Home/>} path="/" />
					<Route element={<Details/>} path="/details/:characterId" />
				</Routes>
			</BrowserRouter>
		</AppWrapper>
  );
}

export default App;