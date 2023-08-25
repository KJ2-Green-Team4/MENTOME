import HeaderRightImg from '../../../Assets/Image/HeaderRightImg';
import styles from './InstructionBar.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const InstructionBar = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Row>
                    <Col xs={10} md={8} className={styles.verticalcenter}>
                        <div className={styles.leftDiv}>
                            {/* // hero-content container */}
                            <h1>멘토링</h1>
                            <p>각 운동 종목들의 고수님들과 함께 멘토링을 해보세요!</p>
                        </div>
                    </Col>
                    <Col xs={2} md={4}>
                        <div className={styles.rightDiv}>
                            <div className={styles.HeaderImg}>
                                <HeaderRightImg />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default InstructionBar;
