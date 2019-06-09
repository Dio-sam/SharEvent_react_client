import React from "react";
import { Spinner } from 'react-activity';
import * as moment from 'moment';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          articles: [],
          isLoading: false
        };
    }

    componentDidMount() {
        console.log(">> #cDM");
        this.getArticles();
        console.log("<< #cDM");
      }

    getArticles() {
        console.log(">> #getArticles");
        const url = `https://newsapi.org/v2/everything?language=en&domains=theverge.com,techcrunch.com&apiKey=b4c27691622146f8a00ba165988c7adb`;
        console.log('url', url);
        fetch(url)
          .then(res => res.json())
          .then(data => {
            console.log(" #getArticles fetch data", data);
            this.setState({
              articles: data.articles,
              isLoading: true
            })
        });
        console.log("<< #getArticles");
      }

    render() {
        const { articles } = this.state;
        const { isLoading } = this.state;
        if(!isLoading) {
            return <Spinner className="spinner" color="#191102" size={30} speed={1} animating={true} />
        } else {
    return(
          <div className="container">
                      <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <h2 className="text-center mb-3 titleStyle"><i className="far fa-newspaper"></i> News</h2>

                        {articles.map((article, index) =>
                        <div key={index}>
                          <div className="row borderStyle">
                                  <div className="col-md-4 imageBlock">
                                    <img className="d-flex align-self-start" style={{
                                        maxWidth:300,
                                    }}
                                        src={article.urlToImage} alt={article.title}
                                    />
                                    </div>
                                    <div className="col-md-8 card-body">
                                      <div className="titleEvents">Source: {article.source.name}</div>

                                      <ul className="list-unstyled" style={{ fontWeight: "light" }}>
                                          <li><i className="fas fa-user-tag"> Author:</i> {article.author}</li>
                                          <li><i className="fas fa-calendar-minus"> Published:</i> {moment(article.publishedAt).format('DD/MM/YYYY')}</li>
                                          <li><i className="fas fa-quote-left"> Title:</i> {article.title}</li>
                                          <li><i className="fas fa-sticky-note"> Description:</i> {article.description}</li>
                                      </ul>
                                      <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#5D5D5D', fontSize: 18, marginLeft: '40%' }}><i className="fas fa-external-link-alt"></i> Discover</a>
                                    </div>
                                    </div>
                    </div>
                    )}
            </div>
	        </div>
        </div>
      );
    }
  }
}

export default News;