import styles from './PlusReplyButton.module.css';
import PlusIcon from '../../../Assets/Icon/PlusIcon';

const PlusReplyButton = ({ name, onClick }) => {
    return (
        <div className={styles.Reply__button_body} onClick={onClick}>
            <PlusIcon />
            <span>{name}</span>
        </div>
    );
};

export default PlusReplyButton;
