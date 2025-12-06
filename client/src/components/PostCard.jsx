import { Link } from 'react-router-dom';
import './PostCard.css';
import { formatDistanceToNow, format } from 'date-fns';

const PostCard = ({ post }) => {

  return (
    <div className="post-card">
      <Link to={`/posts/${post._id}`} className="post-card-link">
        <h2>{post.title}</h2>
        <div className="post-meta">
          <span className="post-author">By {post.user?.name || 'Unknown'}</span>
          <span 
            className="post-date" 
            title={format(new Date(post.createDate), "PPPP 'at' p")}
          >
            {formatDistanceToNow(new Date(post.createDate), { addSuffix: true })}
          </span>
        </div>
        <p className="post-preview">
          {post.body.substring(0, 150)}
          {post.body.length > 150 ? '...' : ''}
        </p>
        <span className="read-more">Read more →</span>
      </Link>
    </div>
  );
};

export default PostCard;
