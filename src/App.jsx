import { Player } from "./components/player/player";

function App() {
  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-cyan-950 text-white">
        <Player />
      </div>
    </>
  );
}

export default App;
