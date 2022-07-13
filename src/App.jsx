import TarefasList from "./components/TarefasList";
import Footer from "./components/Header/Footer";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";

function App() {
    return(
        <div>
            <Header />
            <Routes>                
                <Route path="/" element={<TarefasList />}/>
                           
            </Routes>
            <Footer />
        </div>
        
        
    )
}

export default App;