import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    // console.log("Hello i am news constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`
  }


  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
    // {console.log("this is update section")}
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json(); // corrected line
    // // console.log(parsedData);
    // this.setState({ 
    //     articles: parsedData.articles,
    //     loading: false,
    //     totalResults:  parsedData.totalResults
    // });
    this.updateNews();
  }

  handleNextclick = async () => {
    // console.log("Next");
    const nextPage = this.state.page + 1;
    if (nextPage > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    } else {
      // let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true})
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // // console.log(parsedData);
      // this.setState({
      //     page: this.state.page + 1,
      //     articles: parsedData.articles,
      //     loading: false
      // })
      this.setState({ page: nextPage })
      this.updateNews();
    }
  }

  handlePreviousclick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json(); 
    // // console.log(parsedData);
    // this.setState({ 
    //     articles: parsedData.articles, 
    //     page: this.state.page-1,
    //     loading: false
    // });
    // console.log("previous button clicked")
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }


  fetchMoreData = async()=>{
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles===parsedData.articles?this.state.articles:this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults,
    });
  }

  render() {
    return (
      <>
        {/* this is a news component */}
          <h1 className='text-center my-3'>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.articles.length !== (this.state.totalResults+this.props.pageSize) ?<Spinner/>: null}
                > 
                {console.log(this.state.articles.length, this.props.pageSize)}
              <div className="container">
                <div className="row">
                  {console.log(this.state.articles)}
                  {this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedDate={element.publishedAt} source={element.source} />
                    </div>
                  })}
                  {/* {console.log("this is render section")} */}
                </div>
              </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
