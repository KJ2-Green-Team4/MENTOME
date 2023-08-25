// 멘토 게시판
import { Container, Row } from 'react-bootstrap';
import Header from '../Components/Home/Header/Header';
import MentorCard from '../Components/Home/MentoringWrappers/MentorCard';
import styles from './Mentor.module.css';
function Mentor() {
    return (
        <>
            <Header />
            <Container>
                <div className={styles.margin}>
                    <h1 className={styles.font__mentee}>멘토게시판</h1>
                    <Row>
                        <MentorCard />
                    </Row>
                </div>
            </Container>
        </>
    );
}

export default Mentor;
