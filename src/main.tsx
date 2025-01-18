import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from "./ui/upload/upload.tsx";
import NavigationMenu from "./common/header/header.tsx";
import ArgumentResults from "./ui/arguments/arguments.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
          <NavigationMenu />
          <Routes>
              <Route path='/' element={<App />}></Route>
              <Route path='/upload' element={<Upload />}></Route>
              <Route path='/arguments' element={<ArgumentResults />} ></Route>
          </Routes>
      </Router>
    {/*<App />*/}
  </StrictMode>,
)
