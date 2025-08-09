'use client';

import Image from "next/image";
import styles from "./page.module.css";

import { useEffect, useState } from "react";

export default function Home() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    const fetchAnuncios = async () => {
      const response = await fetch("http://localhost:5566/anuncios");
      const data = await response.json();
      setAnuncios(data);
    };

    fetchAnuncios();
  }, []);

  function handleAddAnuncio() {
    const newAnuncio = {
      id: Math.floor(Math.random() * 100000),
      id_vendedor: 1,
      titulo: `Anúncio ${Math.floor(Math.random() * 100)}`,
      descricao: "Descrição do anúncio aqui",
      preco_unidade: (Math.random() * 100).toFixed(2),
      quantidade: Math.floor(Math.random() * 100),
      status: "ativo",
    };

    fetch("http://localhost:5566/anuncios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnuncio),
    })
      .then(() => window.location.reload())
      .catch(() => window.location.reload());
  }

  function handleDeleteAnuncio(id) {
    fetch(`http://localhost:5566/anuncios/${id}`, {
      method: "DELETE",
    })
      .then(() => window.location.reload())
      .catch(() => window.location.reload());
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <Image
            src="/arrow-back.svg"
            alt="Back to previous page"
            width={24}
            height={24}
          />
          <h1 className={styles.title}>Anúncios</h1>
        </header>
        <div className={styles.list}>
          {anuncios.map((ad) => (
            <Anuncio key={ad.id} {...ad} onDelete={handleDeleteAnuncio} />
          ))}
        </div>
      </main>
      <button type="button" className={styles.addButton} onClick={handleAddAnuncio}>
        <Image
          src="/add.svg"
          alt="Add new ad"
          width={24}
          height={24}
        />
        Adicionar
      </button>
    </div>
  );
}

function Anuncio({ id, titulo, descricao, preco_unidade, quantidade, status, onDelete }) {
  return (
    <div className={styles.anuncio}>
      <div>
        <h3>{titulo}</h3>
        <p>{descricao}</p>
        <p>Preço: R$ {preco_unidade}</p>
        <p>Quantidade: {quantidade}</p>
        <p>Status: {status}</p>
      </div>
      <Image
        className={styles.deleteIcon}
        src="/delete.svg"
        alt="Delete"
        width={24}
        height={24}
        onClick={() => onDelete(id)}
      />
    </div>
  );
}
