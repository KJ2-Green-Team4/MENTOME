// 새글쓰기
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import QuillEditor from '../Components/UI/Editor/Editor';
import styles from './Posting.module.css';

function Posting() {
    const [postType, setPostType] = useState('멘티');
    const [isMentor, setIsMentor] = useState(true);

    const [formData, setFormData] = useState({
        postType: '멘티',
        title: '',
        sport: '',
        career: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // formData에 postType 값을 추가합니다.
        formData.postType = postType;

        axios
            .post('/api/content/uploadpost', formData)
            .then((response) => {
                // 요청이 성공적으로 처리된 경우의 작업
                console.log('요청이 성공적으로 처리되었습니다.', response);
                window.location.href = '/';
            })
            .catch((error) => {
                // 요청이 실패한 경우의 작업
                console.error('요청이 실패하였습니다.', error);
            });
    };

    const isFormValid = () => {
        const { title, sport, career, content } = formData;

        if (!sport || !title || !career || !content) {
            return false;
        }

        return true;
    };

    const handleButton = () => {
        setIsMentor((prevState) => !prevState);
        setPostType((prevType) => (prevType === '멘토' ? '멘티' : '멘토'));
    };

    return (
        <>
            <Container>
                <form onSubmit={handleSubmit}>
                    <div className={styles.pages}>
                        <div className={styles.hivQQk}>
                            <div className={styles.wrapper}>
                                <div className={styles.alert}>
                                    <div className={styles.alert__main}>
                                        <span className={styles.alert_span}>
                                            🧚🏻 안녕하세요 회원님 !🖐🏻
                                            <span>
                                                <span
                                                    className={
                                                        styles.alert__span_p
                                                    }
                                                >
                                                    {isMentor ? '멘티' : '멘토'}
                                                </span>
                                                가 되기 위해서{' '}
                                            </span>
                                            글을 작성 해주세요.
                                        </span>
                                        <button
                                            type="button"
                                            // name="mento"
                                            // value={isMentor ? '멘토' : '멘티'}
                                            className={styles.alert_button}
                                            onClick={handleButton}
                                        >
                                            ⚠️혹여나{' '}
                                            {isMentor ? '멘티' : '멘토'}님이
                                            아니시라면?{' '}
                                            {isMentor ? '멘토🏃🏻' : '멘티🐣'}로
                                            바꾸기{' '}
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.title__div}>
                                    <div className={styles.title__title}>
                                        <textarea
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="글의 제목을 입력하세요"
                                            style={{ height: '66px' }}
                                            className={styles.title__textaria}
                                        ></textarea>
                                        <div
                                            className={styles.title__line}
                                        ></div>
                                        <div className={styles.title__value}>
                                            <input
                                                type="text"
                                                name="sport"
                                                value={formData.sport}
                                                onChange={handleChange}
                                                placeholder={` - 어떤 분야의 멘토링을 ${
                                                    isMentor ? '받기' : '하기'
                                                } 원하시나요? | 원하시는 분야를 입력해주세요.`}
                                                className={
                                                    styles.title__value_input
                                                }
                                            ></input>
                                            <input
                                                type="text"
                                                name="career"
                                                value={formData.career}
                                                onChange={handleChange}
                                                placeholder=" - 경력이 몇 년차이신가요? | 숫자로 입력해주세요. "
                                                className={
                                                    styles.title__value_input
                                                }
                                            ></input>
                                        </div>
                                        {/* Bookmark */}
                                        <div className={styles.quill}>
                                            <QuillEditor
                                                name="content"
                                                value={formData.content}
                                                placeholder="글의 내용을 더욱 자세하게 적어주세요!"
                                                onChange={(content) =>
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        content,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className={styles.footer}>
                                            <div className={styles.footer_div}>
                                                <button
                                                    className={`${styles.button} ${styles.form_submit} ${styles.primary}`}
                                                    disabled={!isFormValid()}
                                                    type="submit"
                                                >
                                                    저장하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
}

export default Posting;
