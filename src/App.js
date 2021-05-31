import React, { useEffect, useState, useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/News/NewsCards';
import './App.css'


function App() {

  const AlanKey = 'ede1a2b5f26c3f6955e45aea973a6be72e956eca572e1d8b807a3e2338fdd0dc/stage';
  const alanBtnInstance = useRef(null);
  const newsArticles = useRef([]);
  const [news, setNews] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);


  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: AlanKey,
        onCommand: ({ command, articles }) => {
          if (command === 'newsHeadlines') {
            console.log(articles);
            newsArticles.current = articles;
            // console.log(newsArticles);
            setNews(newsArticles.current);
            // console.log('news=', news)
          }
          else if (command === 'highlight') {
            setActiveArticle(prevActiveArticle => prevActiveArticle + 1);
          }

        },
      });
    }
  }, []);


  return (
    <div >
      <div className="App">
        Alan AI News Application
      </div>
      <NewsCards articles={news} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
