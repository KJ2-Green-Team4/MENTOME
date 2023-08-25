import styles from './MinusReplyButton.module.css';
import MinusIcon from '../../../Assets/Icon/MinusIcon';

const MinusReplyButton = ({ onClick }) => {
    return (
        <div className={styles.Reply__button_body} onClick={onClick}>
            <MinusIcon />
            {/* 조건문이 들어가야함 length == 0 -> 답글 달기 / else -> n개의 답글 */}
            <span>숨기기</span>
        </div>
    );
};

export default MinusReplyButton;
