// import profile from '../../assets/images/img.png';
import styles from './PostCard.module.css';
import { Link } from 'react-router-dom';
const PostCard = (props) => {
    return (
        <>
            {/* <div className={styles.CardSize}>
                <Link to={`/PostDetail/${props.id}`}>
                    <h1>{props.title}</h1>
                    <div className={styles.left}>
                        <h2> 운동</h2>
                        <h3> {props.value}</h3>
                    </div>
                    <div className={styles.line}></div>

                    <div className={styles.left}>
                        <img src={props.imgurl} alt="프로필이미지"></img>
                        <h4> {props.nickname} </h4>
                        <h5> {props.career}년차 </h5>
                    </div>
                </Link>
            </div> */}
            {/* section 태그에 data-id..? 흠냐 찾아봐야한다. */}
            <Link to={`/PostDetail/${props.id}`}>
                <section className={styles.card}>
                    <div className={styles.card__top}>
                        <h3 className={styles.card__title}>{props.title}</h3>
                        <div className={styles.card__info_wrapper}>
                            <dl className={styles.card__info_list}>
                                <div>
                                    <dt>운동</dt>
                                    <dd>{props.value}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className={styles.card__bottom}>
                        {/* eslint-disable-next-line */}
                        <a className={styles.card__name}>{props.nickname}</a>
                        <dd className={styles.card__career}>
                            {props.career}년차
                        </dd>
                    </div>
                </section>
            </Link>
        </>
    );
};

export default PostCard;
