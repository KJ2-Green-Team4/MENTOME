import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CommentTextarea.module.css';

const CommentTextarea = ({ onClick, id }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const location = useLocation();
    const { pathname } = location;
    const postId = pathname.split('/')[2];

    const uploadCommentReply = async () => {
        try {
            // Send the comment data to the server
            const response = await axios.post(`/api/content/uploadcommentreply/${postId}/${id}`, {
                replyContent: comment,
                // You can include other properties for the comment reply here if needed
            });

            // Handle the response here (e.g., show success message)
            console.log('Comment reply uploaded successfully:', response.data);
            // Clear the textarea after successful upload
            setComment('');
            window.location.reload();
        } catch (error) {
            // Handle errors here (e.g., show error message)
            console.error('Error uploading comment reply:', error);
        }
    };

    const handleTextareaKeyDown = (event) => {
        // 엔터키(키 코드 13)를 눌렀을 때 handleCommentSubmit 함수를 호출합니다.
        if (event.keyCode === 13) {
            uploadCommentReply(event);
        }
    };

    return (
        <div>
            <textarea
                placeholder='댓글을 작성하세요'
                className={styles.Reply__comment_textarea}
                style={{ height: 69.3333 }}
                onChange={handleCommentChange}
            ></textarea>
            <div className={styles.Reply__comment_buttons_wrapper}>
                <button onClick={onClick} color='transparent' className={styles.Reply__comment_buttons_cancel}>
                    취소
                </button>
                <button
                    onClick={uploadCommentReply}
                    color='teal'
                    className={styles.Reply__comment_buttons_write_comment}
                    onKeyDown={handleTextareaKeyDown} // 엔터키 이벤트 핸들러 추가
                >
                    댓글 작성
                </button>
            </div>
        </div>
    );
};

export default CommentTextarea;
