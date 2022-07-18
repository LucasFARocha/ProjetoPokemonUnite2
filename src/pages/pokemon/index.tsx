import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pokemonService, { IPokemon } from '../../services/PokemonService';

export const Pokemon = () => {
  import('./styles.css')

  const { uri } = useParams();

  const setColor = (newColor: any) => {
    document.documentElement.style.setProperty('--pokemon-color', newColor);
  }

  const [pokemon, setPokemon] = useState<IPokemon>();
  useEffect(() => {
    pokemonService.getPokemon(uri || "").then((data) => setPokemon(data));
  }, []);

  if (!pokemon) {
    return null;
  }

  setColor(pokemon.color)

const hashMap: { [key in number] : string} = {
  1: 'Iniciante',
  2: 'Intermediário',
  3: 'Expert'
}

  return (
    <>
      <section className="preview__container">
        <div className="preview__pokemon">
          <img className="preview__image" src={`/assets/images/stat/stat-${pokemon.avatar}.png`} alt="Charizardinho" />
        </div>
        <div className="preview__details">
          <h1 className="pokemon-color">{pokemon.name}</h1>
          <p className="preview__level">Nível: {hashMap[pokemon.level]}</p>
          <p className="preview__description">{pokemon.description}</p>
          <div className="preview__pills">
            {
              pokemon.stats_battle.map((item) => {
                return <span className="preview__pill">{item}</span>
              })
            }
          </div>
        </div>
      </section>
      <section className="skills__container">
        <h2 className="skills__title pokemon-color" >Skills do Pokémon</h2>
        <p className="skills__description">Esse Pokémon possui as seguintes habilidades de batalha:</p>
        <div className="skills__list">
          <div className="skills__item">
            <label className="skills__label pokemon-color">Ataque</label>
            <progress className="skills__progress pokemon-color" value={pokemon.skills.attack} max="100"></progress>
          </div>
          <div className="skills__item">
            <label className="skills__label pokemon-color">Resistência</label>
            <progress className="skills__progress pokemon-color" value={pokemon.skills.resistance} max="100"></progress>
          </div>
          <div className="skills__item">
            <label className="skills__label pokemon-color">Mobilidade</label>
            <progress className="skills__progress pokemon-color" value={pokemon.skills.mobility} max="100"></progress>
          </div>
          <div className="skills__item">
            <label className="skills__label pokemon-color">Pontuação</label>
            <progress className="skills__progress pokemon-color" value={pokemon.skills.punctuation} max="100"></progress>
          </div>
          <div className="skills__item">
            <label className="skills__label pokemon-color">Apoio</label>
            <progress className="skills__progress pokemon-color" value={pokemon.skills.support} max="100"></progress>
          </div>
        </div>
      </section>
      {
        !!pokemon.evolutions.length && //também pode ser: Boolean{pokemon.evolutions.length} &&
        <section className="evolutions__container">
          <h2 className="pokemon-color">Evoluções</h2>
          <p className="">Esse Pokémon pode evoluir em:</p>
          <div className="evolutions__list">
            {
              pokemon.evolutions.map((evolution) => {
                return (
                  <div className="evolutions__item">
                    <img src={`/assets/images/evolution/${evolution.avatar}`} alt="Charmander" className="evolutions__image" />
                    <div className="evolutions__details">
                      <p className="evolutions__name pokemon-color">{evolution.name}</p>
                      <p className="">Nível: {evolution.level}</p>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </section>
      }

    </>
  );
}
