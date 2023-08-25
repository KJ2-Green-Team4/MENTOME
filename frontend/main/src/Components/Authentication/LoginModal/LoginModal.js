// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import styles from './LoginModal.module.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import LoginCharImg from '../../Assets/Image/LoginCharImg';

const LoginModal = ({ isOpen, onRequestClose }) => {
    const formRef = useRef();
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['id']);
    // const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios
            .post('/api/account/login', {
                userId: formRef.current.id.value,
                password: formRef.current.password.value,
            })
            .then((res) => {
                console.log(formRef.current.id.value);
                if (res.data.logInSuccess === false) {
                    alert(res.data.message);
                } else {
                    setCookie('logInUser', formRef.current.id.value);
                    window.location.href = '/';
                }
            });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.aligncenter}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.grayblock}>
                    <div>
                        <div className={styles.LoginCharImg}>
                            <LoginCharImg />
                        </div>
                        <div className={styles.welcome}>환영합니다!</div>
                    </div>
                </div>
                <div className={styles.whiteblock}>
                    <div className={styles.exitwrapper}>
                        <svg
                            stroke='currentColor'
                            fill='currentColor'
                            stroke-width='0'
                            viewBox='0 0 24 24'
                            tabindex='1'
                            height='1em'
                            width='1em'
                            xmlns='http://www.w3.org/2000/svg'
                            onClick={onRequestClose}
                        >
                            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
                        </svg>
                    </div>
                    <div className={styles.blockcontent}>
                        <div className={styles.whitemarginblock}>
                            <div className={styles.upperWrapper}>
                                <h2>로그인</h2>
                                <section>
                                    {/* <h4>이메일로 로그인</h4> */}
                                    <form className={styles.formstyle} ref={formRef}>
                                        <input
                                            // _onChange={(e) => {
                                            // dispatch({type:"INPUT"}, payload:{id:"", pwd:""})
                                            //     setId(e.target.value);
                                            // }}
                                            name='id'
                                            tabindex='2'
                                            placeholder='아이디를 입력하세요. '
                                        ></input>
                                        <input
                                            // _onChange={(e) => {
                                            //     setPwd(e.target.value);
                                            // }}
                                            name='password'
                                            tabindex='3'
                                            placeholder='비밀번호를 입력하세요 '
                                            type='password'
                                        ></input>
                                        <button tabindex='4' onClick={login}>
                                            로그인
                                        </button>
                                    </form>
                                </section>
                            </div>

                            <div className={styles.foot}>
                                <span>아직 회원이 아니신가요?</span>
                                <div className={styles.link} tabindex='7'>
                                    <Link to='signup' className={styles.removecolor} onClick={onRequestClose}>
                                        회원가입
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
