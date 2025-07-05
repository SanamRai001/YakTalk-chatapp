import { BrowserRouter, Routes, Route } from "react-router-dom";
import Socket from "./Socket";
import Login from "./Login";
import Signup from "./Signup";
import HomePage from "./HomePage";
function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/chat" element={<Socket></Socket>}></Route>
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App