import style from "./comment.module.css";
import CommentBox from "../commentBox/CommentBox";
// import { BiSolidUpvote } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { commentsAtom } from "../../Data";

export default function Comment({ comment, index }) {
  const [showInputBox, setShowInputBox] = useState(false);
  const [score, setScore] = useState(0);
  const [reply, setReply] = useState("");
  const [comments, setComments] = useRecoilState(commentsAtom);

  function handleReply() {
    setShowInputBox(!showInputBox);
  }
  function handleSendReply(index) {
    const currentComment = comments[index];
    const newReplies = [...currentComment.replies, reply];
    // newReplies.push(reply);
    console.log(comments);
    console.log(index);
    currentComment.replies = newReplies;
    console.log(newReplies);
    // comments.splice(index, 1);
    // comments.splice(index, 0, currentComment);
    // const updated = [
    //   ...comments,
    //   {
    //     replies: newReplies
    //   }
    // ];
    // setComments(...comments);
    setReply("");
    setShowInputBox(false);
  }
  function handleUpvote() {
    comment.upvotes = comment.upvotes + 1;
    setScore(score + 1);
  }
  function handleDownvote() {
    comment.downvotes = comment.downvotes - 1;
    setScore(score - 1);
  }
  return (
    <div className={style.commentContainer}>
      {comment.parentComment}
      <span>
        <p>{score}</p>
        <p onClick={handleUpvote}>
          {/* <BiSolidUpvote /> */}
          upvote
          {comment.upvotes}
        </p>
        <p onClick={handleDownvote}>
          {/* <BiSolidDownvote /> */}
          downvote
          {comment.downvotes}
        </p>
        <button className={style.replyBtn} onClick={handleReply}>
          {/* {showInputBox ? close :} */}reply
        </button>
      </span>
      {showInputBox && (
        <div className={style.container}>
          <input
            type="text"
            placeholder="Reply here..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <button onClick={() => handleSendReply(index)}>Send</button>
        </div>
      )}
      <div>
        {comment.replies.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
    </div>
  );
}
