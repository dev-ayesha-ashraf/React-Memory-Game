import Cards from "./components/Cards";

export default function App() {
  return (

    <div className="w-full h-screen flex flex-col justify-center align-center">
      <h1 className="text-3xl font-bold text-center text-white mt-5">
        Memory Game
      </h1>
      <div className="w-1/2 shadow shadow-fuchsia-950 m-auto">
     <Cards />
      </div>
    </div>
  )
}