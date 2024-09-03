import React, { useState, useEffect } from 'react';
import axios from 'axios';
import news from './news.css';


const API_KEY = '29b789b7b3074d4ab36ecb8da0efd22f'; // Replace with your News API key
const API_URL = 'https://newsapi.org/v2/everything';

const categories = [
  'accidents',
  'emergency',
  'crime',
  'safety',
  'health',
  'medicine',
  'mental health'
];

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: selectedCategory,
            apiKey: API_KEY,
            pageSize: 10 // Number of articles to fetch
          }
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="news-feed">
      <h1>You Know What?</h1>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="news-list">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <ul>
            {articles.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <small>{new Date(article.publishedAt).toLocaleDateString()}</small>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
