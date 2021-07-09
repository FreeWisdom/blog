import React, { Component } from 'react';
import {Link} from "react-router-dom"

export interface NewsProps {
    
}
 
export interface NewsState {
    
}
 
class News extends Component<NewsProps, NewsState> {
    constructor(props: NewsProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return (
            <div>这是新闻页面，登陆了才可以访问<Link to="/login">去登陆</Link></div>
          );
    }
}
 
export default News;