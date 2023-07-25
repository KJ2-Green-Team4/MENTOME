// 새글쓰기
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import QuillEditor from '../components/UI/Editor/Editor';

function Posting() {
    const [formData, setFormData] = useState({
        title: '',
        sport: '',
        career: '',
        content: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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

    return (
        <>
            <Container>
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="제목을 입력하세요"
                        style={{ height: '66px' }}
                    ></textarea>
                    <input
                        type="text"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        placeholder="운동 종목을 입력하세요"
                    ></input>
                    <input
                        type="text"
                        name="career"
                        value={formData.career}
                        onChange={handleChange}
                        placeholder="경력을 입력하세요"
                    ></input>
                    <QuillEditor
                        name="content"
                        value={formData.content}
                        onChange={(content) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                content
                            }))
                        }
                    />

                    <button>나가기</button>
                    <button type="submit">저장하기</button>
                </form>
            </Container>
        </>
    );
}

export default Posting;
