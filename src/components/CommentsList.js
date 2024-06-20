import React from "react";
import Comment from "./Comment"; // Ensure the path is correct

const CommentsList = ({
  comments,
  handleLikeClick,
  handleContributeClick,
  handleReplyChange,
  handleCancelReply,
  handleReplySubmit,
  replyText,
}) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          handleLikeClick={handleLikeClick}
          handleContributeClick={handleContributeClick}
          handleReplyChange={handleReplyChange}
          handleCancelReply={handleCancelReply}
          handleReplySubmit={handleReplySubmit}
          replyText={replyText}
        />
      ))}
    </div>
  );
};

export default CommentsList;
