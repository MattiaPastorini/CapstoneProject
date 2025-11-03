import React, { useEffect, useState } from "react";

function NewsPage() {
  // Stato per articoli e caricamento
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Esegue il fetch delle notizie quando il componente viene montato
  useEffect(() => {
    // Funzione asincrona per richiedere news dalla API
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q="Formula 1"+OR+F1&language=it&sortBy=publishedAt&apiKey=e2ae0109de144950874a96d53319c148`
        );
        const data = await res.json();

        // If che filtra le notizie e mostra solo quelle inerenti alla Formula 1
        if (data.articles) {
          const filtered = data.articles.filter(
            (article) =>
              article.title.includes("Formula 1") ||
              article.title.includes("F1") ||
              article.description?.includes("Formula 1") ||
              article.description?.includes("F1")
          );

          // Ordina gli articoli dal più recente al più vecchio
          const sortedArticles = filtered.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );

          // Aggiorna lo stato degli articoli
          setArticles(sortedArticles);
        } else {
          // Nessun articolo trovato
          setArticles([]);
        }
      } catch (err) {
        // Gestione degli errori di rete o parsing
        console.error("Errore nel fetch delle notizie:", err);
        setArticles([]);
      } finally {
        // Fine caricamento
        setLoading(false);
      }
    };

    // Avvia il download delle news
    fetchNews();
  }, []);

  // Se sta ancora caricando mostra messaggio di caricamento
  if (loading) {
    return (
      <p className="text-center text-light py-5">Caricamento notizie...</p>
    );
  }

  // Se non ci sono articoli mostra il messaggio
  if (!articles.length) {
    return (
      <p className="text-center text-light py-5">
        Nessuna notizia disponibile.
      </p>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-light">
        Tutte le Notizie Formula 1
      </h2>
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm bg-dark text-light rounded-4">
              {/* Immagine dell’articolo, se disponibile */}
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top rounded-top-4"
                  alt={article.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                {/* Titolo dell’articolo */}
                <h5 className="card-title">{article.title}</h5>
                <br />
                {/* Descrizione dell’articolo */}
                <p className="card-text">{article.description}</p>
                {/* Link al sito della notizia */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger mt-auto"
                >
                  Leggi di più
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
