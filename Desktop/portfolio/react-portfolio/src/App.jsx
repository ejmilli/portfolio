import styles from "./App.module.css";
import { About } from "./components/About/about";
import { Hero } from "./components/Hero/hero";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}

export default App;
