// 멘티 게시판
import { Container, Row } from 'react-bootstrap';
import Header from '../Components/Home/Header/Header';
import MentoringWrappers from '../Components/Home/MentoringWrappers/MenteeCard';
import styles from './Mentee.module.css';

function Mentee() {
    return (
        <>
            <Header />
            <Container>
                <div className={styles.margin}>
                    <h1 className={styles.font__mentee}>멘티게시판</h1>
                    <Row>
                        <MentoringWrappers />
                    </Row>
                </div>
            </Container>
        </>
    );
}

export default Mentee;
