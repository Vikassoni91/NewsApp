import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl, publishedDate, author, source} = this.props;
    return (
      <div className='my-3'>
           <div  className="card">
            <div>
              <span className="badge rounded-pill bg-danger" style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>{source.name}</span>
            </div>
            <img src={imageUrl?imageUrl:"https://cdn.contexttravel.com/image/upload/w_1500,q_60/v1571947279/blog/36%20Hours%20in%20NYC/NewYorkStreets.jpg"}  className="card-img-top" alt="..."/>
            <div  className="card-body">
                <h5  className="card-title">{title?title:""}</h5>
                {/* {console.log({publishedDate})} */}
                <p  className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:'unknown'} on {new Date(publishedDate).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl}  target ="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
