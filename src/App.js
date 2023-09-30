import "./App.css";
// import Container from "@material-ui/core/Container";
import CustomCard from "./component/CustomCard";
import { useMachine } from "@xstate/react";
import fetchMachine from "./machine";
import { useEffect, useState } from "react";
import Loader from "./component/Loder";
import { Button, Container } from "@material-ui/core";

function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [state, send] = useMachine(fetchMachine);
  const { data, isLoading } = state.context;
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    send("FETCH");
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (event) => {
    const htmlHeight = document.documentElement.scrollHeight;
    const scrollHeight = Math.ceil(document.documentElement.scrollTop);
    const viewPortHeight = window.innerHeight;
    if (viewPortHeight + scrollHeight === htmlHeight) {
      send("FETCH");
    }
    if (scrollHeight > 2000) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  const handleGoTop = (event) => {
    event.preventDefault();
    document.documentElement.scrollTop = 0;
  };
  return (
    <div className="App">
      <Container maxWidth="md" style={{ marginBottom: "20px" }}>
        {!!data?.length && data.map((data, index) => <CustomCard data={data.node} key={index} />)}
      </Container>
      {showTopBtn && (
        <Button
          variant="contained"
          color="primary"
          id="backToTopBtn"
          size="small"
          onClick={handleGoTop}
        >
          Top
        </Button>
      )}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
