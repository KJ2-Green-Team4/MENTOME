import ArrowIcon from '../../Assets/Icon/ArrowIcon';
import styles from './IntroTitle.module.css';
import { Link } from 'react-router-dom';

const IntroTitle = ({ name, url }) => {
    return (
        <div className={styles.home}>
            <div className={styles.intro__title}>
                {name}
                <Link to={url}>
                    {/* eslint-disable-next-line */}
                    <a className={styles.intro__title_link} type="external">
                        {name} 더보기
                        <ArrowIcon width={16} height={16} />
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default IntroTitle;
