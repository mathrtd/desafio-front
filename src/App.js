import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './pages/details/';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
			<div className="max-w-full">
				{/* <Header /> */}
			</div>
			<Routes>
				<Route element={<Home/>} exact path="/" />
				<Route element={<Details/>} path="/details" />
			</Routes>
			{/* Footer Area */}
			<div className="max-w-full">
				{/* <Footer /> */}
			</div>
		</BrowserRouter>
  );
}

export default App;
