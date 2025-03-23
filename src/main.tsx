import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Upload from "./ui/upload/upload.tsx";
import NavigationMenu from "./common/header/header.tsx";
// import ArgumentResults from "./ui/arguments/arguments.tsx";
import TabHeaders from "./ui/arguments/tabHeader.tsx";
import PastResults from "./ui/results/history.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
          <NavigationMenu />
          <Routes>
              <Route path='/' element={<App />}></Route>
              <Route path='/upload' element={<Upload />}></Route>
              {/*<Route path='/arguments' element={<ArgumentResults />} ></Route>*/}
              <Route path='/arguments' element={<TabHeaders />} ></Route>
              <Route path='/history' element={<PastResults />} ></Route>
          </Routes>
      </Router>
    {/*<App />*/}
  </StrictMode>,
)
