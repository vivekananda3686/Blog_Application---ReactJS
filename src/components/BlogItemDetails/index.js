import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

// const blogData = {
//   title: 'Blog Name',
//   imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
//   avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//   author: 'Author Name',
//   content:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// }

class BlogItemDetails extends Component {

  state = {
    blogData:{},
    isLoading:true,
  }

  componentDidMount()
    {
      this.getBlogDetails()
    }
  
  getBlogDetails = async () => {
   const {match}=this.props
   const {params}=match
   const {id}=params
   const response=await fetch(`https://apis.ccbp.in/blogs/${id}`)
   const blogItemData=await response.json()
   const updatedBlogItem = {
    title:blogItemData.title,
    imageUrl:blogItemData.image_url,
    content:blogItemData.content,
    avatarUrl:blogItemData.avatar_url,
    author:blogItemData.author,
    id:blogItemData.id,
    topic:blogItemData.topic,
   }
   this.setState({
    blogData:updatedBlogItem,
    isLoading:false,
   })
  }


  renderBlogItemDetails = () => {
    const {blogData}=this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading}=this.state
    return <div className="blog-container">
    {isLoading ? ( <Loader type="TailSpin" color="#00BFFF" height={50} width={50}/> ) : ( this.renderBlogItemDetails())}</div>
  }
}

export default BlogItemDetails
