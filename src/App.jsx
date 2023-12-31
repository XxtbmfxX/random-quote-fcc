import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [claseActual, setClaseActual] = useState(0);

  const [quoteData, setQuoteData] = useState({
    quote: "",
    author: "",
    tags: [],
  });

  const API = "https://api.quotable.io/quotes/random";

  const textColorsAndBackground = [
    "text-bg-primary p-3",
    "text-bg-secondary p-3",
    "text-bg-success p-3",
    "text-bg-danger p-3",
    "text-bg-warning p-3",
    "text-bg-info p-3",
    "text-bg-light p-3",
    "text-bg-dark p-3",
  ];

  const cambiarClase = () => {
    // Calcula el índice de la próxima clase
    const proximaClase = (claseActual + 1) % textColorsAndBackground.length;
    setClaseActual(proximaClase);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      console.log(data);

      setQuoteData({
        author: data[0].author,
        quote: data[0].content,
        tags: data[0].tags,
      });
      cambiarClase();
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={
        {
          width: "375px",
        }
      }
      className={`p-5 rounded  animate__backOutDown ${textColorsAndBackground[claseActual]}`}
      id="quote-box"
    >
      <p id="text">{quoteData.quote}</p>
      <p id="author">{quoteData.author}</p>
      <div className="d-flex justify-content-between" >
        <a
          id="tweet-quote"
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${quoteData.quote}%0A${quoteData.author}`}
        >
          <svg
          
            className=""
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Twitter"
            role="img"
            viewBox="0 0 24 24"
            width="45"
            height="45"
            fill="#1da1f2"
          >
            <path d="M22.46 6c-.84.37-1.74.62-2.68.74.96-.57 1.7-1.48 2.05-2.55-.9.53-1.9.92-2.96 1.13-.85-.9-2.06-1.46-3.4-1.46-2.57 0-4.66 2.09-4.66 4.66 0 .36.04.71.09 1.05-3.87-.19-7.31-2.05-9.62-4.87-.4.68-.63 1.47-.63 2.31 0 1.6.82 3.01 2.06 3.84-.76-.02-1.48-.23-2.1-.57v.06c0 2.23 1.59 4.09 3.7 4.52-.39.1-.8.15-1.22.15-.3 0-.59-.03-.88-.08.59 1.82 2.31 3.15 4.35 3.18-1.59 1.25-3.58 1.99-5.75 1.99-.37 0-.73-.02-1.09-.06 2.05 1.32 4.47 2.09 7.08 2.09 8.5 0 13.13-7.03 13.13-13.13 0-.2 0-.4-.01-.59.9-.65 1.68-1.46 2.29-2.39z"></path>
          </svg>
          
        </a>
        <button className="btn btn-primary" onClick={fetchData} id="new-quote">
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
