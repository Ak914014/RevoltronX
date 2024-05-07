import React, { useEffect, useState } from "react";
import "./News.css";
import { Error } from "../error/Error";

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      let response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=56cb348c25b74d22aa413ac76ef0e5b0"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      let data = await response.json();
      setMyNews(data.articles);
    } catch (error) {
      setError("Failed to fetch headlines. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="news-container">
      <h1 className="text-center my-3">Top Headlines for daily news</h1>
      <div className="mainDiv">
        {error && <div className="error-container"><Error message={error} /></div>} {/* Rendering Error component if there's an error */}
        {mynews.map((ele, key) => (
          <div key={key} className="card" style={{ marginTop: "2rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <img  src={ele.urlToImage || "https://kubrick.htvapps.com/vidthumb/f6865cb1-d77d-4a31-ba83-d57c4b2324d8/4b9c9d8f-ad14-47ea-bcf4-bf24ee0bb1f3.jpg?crop=0.383xw:0.383xh;0.517xw,0.252xh&resize=1200:*"} className="card-img-top card-img" alt="..." />
            <div className="card-body card-info">
              <h5 className="card-title">{ele.author || "Janelle Ash"}</h5>
              <p className="card-text card-news-text">{ele.title}</p>
              <p className="card-text card-date">Date: {ele.publishedAt.slice(0, 10)}</p>
              <a href={ele.url} target="_blank" rel="noopener noreferrer" className="btn card-btn btn-primary">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
