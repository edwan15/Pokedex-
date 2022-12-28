import { SiPokemon } from "react-icons/si";
import { motion } from "framer-motion";
import { MdCatchingPokemon } from "react-icons/md";
import { useEffect, useState } from "react";
import TextSpan from "./TextSpan";
import Link from "next/link";


export default function Home({ array2, tipos, interar }) {
  const sentence = "Pokemon Edwan V.1".split("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.30
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale:0 },
    show: { opacity: 1, scale:1 },
  };

  console.log(array2);
  const [filtrar, setFiltrar] = useState(array2);
  const [filter, setFilter] = useState("");

  const addUser = (e) => {
    setFilter(e.target.value);
  };

  let results = [];

  if (!filter) {
    results = filtrar;
  } else {
    results = filtrar.filter((dato) =>
      dato.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  }

  useEffect(() => {
    array2;
  }, [array2]);

  const filtros = (elTipo) => {
    setFiltrar(array2);

    if (elTipo == "borrar") {
      setFiltrar(array2);
    } else {
      let nuevopokemon = array2
        .filter((pokemon) =>
          pokemon.types.some((tipo) => tipo.type.name == elTipo)
        )
        .map((pokemones) => {
          let nuevospokemones = { ...pokemones };
          return nuevospokemones;
        });
      setFiltrar(nuevopokemon);
    }
  };
  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-7xl font-bold text-boton  cursor-pointer">
          {sentence.map((letter, index) => {
            return <TextSpan key={index}>{letter === " " ? "\u00A0" : letter}</TextSpan>;
          })}
        </h1>
      </div>
      <div className="grid justify-center md:grid-cols-2 mt-5 mx-10 p-4 gap-3">
        <div className=" bg-cardOverlay p-4 rounded-md ">
          <div className="p-4 justify-center items-center flex">
            <button
              className="p-1 px-2 gap-2 rounded-lg bg-boton flex justify-center items-center font-bold  "
              onClick={() => filtros("borrar")}
            >
              Mostrar Todos Los Pokemon
            </button>
          </div>

          <div className="grid">
            <div className="grid grid-cols-4 md:grid-cols-3 gap-3">
              {tipos.map((tipo, index) => {
                return (
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    key={tipo.name}
                    className="p-1 px-2 rounded-lg bg-boton  flex justify-center font-bold items-center gap-2"
                    onClick={() => filtros(tipo.name)}
                  >
                    {tipo.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className=" justify-center items-center flex">
          <div className="justify-center items-center flex   ">
            <form className="">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
              <div className="relative flex">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>

                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-lg text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Buscar Pokemon"
                  required=""
                  value={filter}
                  onChange={addUser}
                />

                <button
                  type="submit"
                  className="text-white  right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 md:grid-cols-3 p-4 gap-15 cursor-pointer"
      >
        {filtrar &&
          results.map((pokemon) => {
            return (
              <div  key={pokemon.id}>
                <motion.div
                  variants={item}
                  key={pokemon.id}
                  className={`w-[300px] h-[200px] border-solid border-2 rounded-xl relative mx-auto mb-10  shadow-lg ${pokemon.types[0].type.name}`}
                >
                  <Link
                    href={{
                      pathname: "/pokemon/[name]",
                      query: { name: pokemon.name },
                    }}
                  >
                    <div className="">
                      <motion.img
                        src={pokemon.images}
                        alt={pokemon.name}
                        className="absolute left-28 top-0 object-scale-down  "
                        width={200}
                        height={200}
                        layoutId={pokemon.images}
                      />
                      <div className=" mx-4 my-16 gap-2">
                        <SiPokemon className="text-5xl font-bold text-white" />
                        <button className="text-xl font-bold ">
                          {pokemon.name}
                        </button>
                        <div className="flex mt-6 ">
                          <MdCatchingPokemon className="text-white " />
                          {pokemon.types.map((tipos, index) => {
                            return (
                              <button key={index}>{tipos.type.name}</button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            );
          })}
      </motion.div>
    </>
  );
}

export async function getServerSideProps() {
  const traerTipos = await fetch("https://pokeapi.co/api/v2/type/");

  const tipos = await traerTipos.json();

  const traerpokemones = (numero) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon/${numero}?limit=101&offset=0`
    )
      .then((respuesta) => respuesta.json())
      .then((data) => data);
  };

  let arraypokemon = [];
  for (let index = 1; index <= 10; index++) {
    let data = await traerpokemones(index);
    arraypokemon.push(data);
  }
  let array2 = arraypokemon.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      images: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
    };
  });

  return {
    props: {
      array2,
      tipos: tipos.results,
    },
  };
}
