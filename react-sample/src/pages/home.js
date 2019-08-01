import React, { Component } from "react";
import * as R from "ramda";
import axios from 'axios';

// import PropTypes from 'prop-types';


function renderPost(p) {
  return (
    <div className="col s12 m6 l4" key={p.id}>
      <div className="card">
        <div className="card-image">
          <img src={p.imageURL} alt="fook" />
          <span className="card-title black-text text-darken-2">{p.title}</span>
        </div>
        <div className="card-content">
          <p>{p.content}</p>
        </div>
      </div>
    </div>
  )
}


function extractRelevantPostData(post) {
  return {
    id: post.id,
    title: post.title,
    content: post.body,
    imageURL: `https://picsum.photos/id/${post.id + 100}/600/600`
  }
}

const get100Posts = async () => {
  return axios.get(`http://jsonplaceholder.typicode.com/posts`)
}

const getPosts = async (count) => {
  const p = await get100Posts();
  return R.take(count, p.data).map(extractRelevantPostData);
}


function Preloader() {
  return (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  )
}

class Home extends Component {

  state = {
    posts: [],
    showPreloader: true,
  }

  constructor(props) {
    super()
  }

  componentDidMount() {
    const posts = getPosts(3 * 12)
    posts.then(x => {
      this.setState({ posts: x, showPreloader: false })
    })
  }

  render() {
    return (
      <div>
        <h2>Recent posts</h2>
        <div>
          {this.state.showPrelaoder && <Preloader />}
        </div>
        <div className="row">
          {this.state.posts.map(renderPost)}
        </div>
      </div>
    );
  }
};

export default Home;
