import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './PostDetail.module.css';
import ReplyButton from '../../UI/Button/ReplyButton/ReplyButton';


const PostDetail = () => {
    // const [post, setPost] = useState([]); // 댓글을 저장할 배열 상태
    const [post, setPost] = useState({
        // title: '더미 제목',
        // username: '더미 유저',
        // date: '2023-07-25',
        // content: '더미 게시물 내용',
    });
    // const [comments, setComments] = useState([]); // 댓글을 저장할 배열 상태
    const [comments, setComments] = useState([
        // {
        //     _id: '64c407a19d751848e2bc8fd2',
        //     commentContent: '저요저요!',
        //     commentWriter: '런린이',
        //     commentDate: '2023.07.26',
        //     commentReplies: [
        //         // 대댓글
        //         {
        //             replyContent: '대댓글 Test!', // 대댓글 내용
        //             replyWriter: '런린이', // 대댓글 작성자
        //             replyDate: '2023.07.26', // 대댓글 작성 시간
        //         },
        //     ],
        // },
        // {
        //     _id: '64c407a19d751848e2bc8fd3',
        //     commentContent: '저요저요!',
        //     commentWriter: '런린이',
        //     commentDate: '2023.07.26',
        //     commentReplies: [
        //         // 대댓글
        //         {
        //             replyContent: '대댓글 Test!', // 대댓글 내용
        //             replyWriter: '런린이', // 대댓글 작성자
        //             replyDate: '2023.07.26', // 대댓글 작성 시간
        //         },
        //     ],
        // },
    ]);
    const [newCommentContent, setNewCommentContent] = useState('');

    // 게시물 디테일 경로를 가져오기
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        // 게시물 데이터를 가져올 API 엔드포인트의 URL
        const postApiUrl = `/api/content/getcontentdetail/${pathname.split('/')[2]}`; // 실제 API URL로 교체해주세요

        // 댓글 데이터를 가져올 API 엔드포인트의 URL
        const commentsApiUrl = `/api/content/getcontentcomments/${pathname.split('/')[2]}`; // 실제 API URL로 교체해주세요

        // Promise.all을 사용하여 게시물 데이터와 댓글 데이터를 한번에 가져옵니다
        Promise.all([axios.get(postApiUrl), axios.get(commentsApiUrl)])
            .then(([postResponse, commentsResponse]) => {
                setPost(postResponse.data); // 게시물 데이터를 설정합니다
                setComments(commentsResponse.data); // 댓글 데이터를 설정합니다
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        //eslint-disable-next-line
    }, []);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const newComment = {
            commentContent: newCommentContent,
            // 댓글 작성자 등 추가정보를 적절히 설정할 것.
        };

        const postId = pathname.split('/')[2];
        const uploadCommentApiUrl = `/api/content/uploadcomment/${postId}`;

        axios
            .post(uploadCommentApiUrl, newComment)
            .then((response) => {
                // 댓글 생성 성공 시 서버에서 저장된 댓글 데이터를 받아와서 배열에 추가
                const uploadedComment = response.data;
                setComments([...comments, uploadedComment]);
                setNewCommentContent('');

                // 댓글 업로드 후에 댓글 리스트를 다시 가져와서 업데이트
                const commentsApiUrl = `/api/content/getcontentcomments/${postId}`;
                axios
                    .get(commentsApiUrl)
                    .then((commentsResponse) => {
                        setComments(commentsResponse.data); // 댓글 데이터를 업데이트합니다.
                    })
                    .catch((error) => {
                        console.error('Error fetching comments:', error);
                    });
            })
            .catch((error) => {
                console.error('댓글 업로드 오류:', error);
            });

        setNewCommentContent('');
    };

    const PostingFormattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleTextareaKeyDown = (event) => {
        // 엔터키(키 코드 13)를 눌렀을 때 handleCommentSubmit 함수를 호출합니다.
        if (event.keyCode === 13) {
            handleCommentSubmit(event);
        }
    };

    const invitationHandler = (userid) => {

        const invitationApiUrl = `/api/notice/addinvitenotice/${userid}`;

        axios
            .post(invitationApiUrl)
            .then((response) => {
                toast.success('멘토링 초대가 완료되었습니다.', {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            })
            .catch((error) => {
                console.error('invitation is not done', error);
            });
    }

    return (
        <Container>
            <div>
                {/* 단일 div 태그 */}
                {/* 페이지 구성 div 태그 */}
                <div className={styles.head_top}>
                    {/* Navbar div 태그 생략 */}
                    {/* 페이지 구성 header 태그부터 시작 */}
                    {/* 여기 div태그는 컨테이너로 구성되어야 하지 않을까? */}
                    <div className={styles.head_margin_lr}>
                        {/* title */}
                        <h1>{post.title}</h1>
                        {/* name , data, button(edit), button(delete) */}
                        {/* button(edit, delete) */}
                        <div className={styles.head_button}>
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                        {/* Name / separate / date */}
                        <div className={styles.profile_bar}>
                            <div className={styles.profile_bar__info}>
                                <span className={styles.username}>{post.writer}</span>
                                <span className={styles.separator}>·</span>
                                <span>{PostingFormattedDate}</span>
                                {/* <p>{post.sport}</p>
                                <p>{post.career}</p> */}
                            </div>
                        </div>
                        <div className={styles.line}></div>
                        {/* 내용(Content) */}
                        <div className={styles.body__head}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />
                        </div>
                        {/* 여백 div */}
                        <div></div>
                        {/* 댓글 div */}
                        <div className={styles.comment__div_header}>
                            <h4>{comments.length}개의 댓글</h4>
                            <div>
                                <div>
                                    <form onSubmit={handleCommentSubmit}>
                                        <textarea
                                            placeholder='댓글을 작성하세요'
                                            name='commentContent'
                                            value={newCommentContent}
                                            className={styles.comment__textarea}
                                            onChange={(e) => setNewCommentContent(e.target.value)}
                                            style={{ height: 69.3333 }}
                                            onKeyDown={handleTextareaKeyDown} // 엔터키 이벤트 핸들러 추가
                                        ></textarea>
                                        {/* button-wrapper */}
                                        <div className={styles.buttons_wrapper}>
                                            <button
                                                color='teal'
                                                className={styles.comment__button}
                                                type='submit'
                                                onClick={handleCommentSubmit}
                                            >
                                                댓글 작성
                                            </button>
                                        </div>
                                    </form>
                                    {/* 댓글 남긴거 */}
                                    <div className={styles.comment__margin_top}>
                                        {/* 댓글 */}
                                        {comments.map((comments) => (
                                            <>
                                                <div className={styles.comment_top}>
                                                    <div className={styles.comment_top}>
                                                        <div className={styles.profile}>
                                                            <img
                                                                src='https://velog.velcdn.com/images/1yoouoo/profile/27630138-254c-45cd-99a6-b9adeadbffc9/image.avif'
                                                                alt='comment-user-thumbnail'
                                                            ></img>
                                                            <div className={styles.comment_Info}>
                                                                <div className={styles.comment__username}>
                                                                    {/* // eslint-disable-next-line */}
                                                                    {/* 부트스트랩의 드롭다운 컴포넌트를 사용합니다 */}
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle className={styles.dropdown_toggle} variant="Secondary" id="dropdown-basic">
                                                                            {comments.commentWriter}
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item onClick={() => invitationHandler(comments.commentWriter)}>멘토링 초대</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                    <ToastContainer
                                                                        position='top-center'
                                                                        autoClose={1000}
                                                                        hideProgressBar={false}
                                                                        newestOnTop={false}
                                                                        closeOnClick
                                                                        rtl={false}
                                                                        pauseOnFocusLoss
                                                                        draggable
                                                                        pauseOnHover
                                                                        theme='light' />
                                                                </div>
                                                                <div className={styles.date}>
                                                                    <span>
                                                                        {new Date(
                                                                            comments.commentDate,
                                                                        ).toLocaleDateString('ko-KR', {
                                                                            year: 'numeric',
                                                                            month: '2-digit',
                                                                            day: '2-digit',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.comment__Content_top} key={comments._id}>
                                                        <div
                                                            className={styles.comment__Content_top}
                                                            dangerouslySetInnerHTML={{
                                                                __html: comments.commentContent,
                                                            }}
                                                        />
                                                    </div>
                                                    {/* True or False - True 답글 달기 - 
                                            False 숨기기 댓글 작성하기 텍스트 박스 */}
                                                    {/*  commentReplies: [
                // 대댓글
                {
                    replyContent: '대댓글 Test!', // 대댓글 내용
                    replyWriter: '런린이', // 대댓글 작성자
                    replyDate: '2023.07.26', // 대댓글 작성 시간
                }
            ], */}
                                                </div>

                                                <ReplyButton id={comments._id} reply={comments.commentReplies} />
                                                {/* {comments.commentReplies.map((reply) => (
                                                    <ReplyButton
                                                        id={comments._id}
                                                        reply = {comments.commentReplies}
                                                        username={reply.replyWriter}
                                                        date={reply.replyDate}
                                                        replyContent={reply.replyContent}
                                                    />
                                                ))} */}
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PostDetail;
