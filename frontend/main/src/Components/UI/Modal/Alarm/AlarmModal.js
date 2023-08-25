import ArrowModal from '../../../Assets/Icon/ArrowModal';
import ExitButton from '../../../Assets/Icon/ExitButton';
import styles from './AlarmModal.module.css';
// import { Button } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AlarmModal = () => {

    const [cookies, setCookie] = useCookies(['roomName']);
    const [notices, setNotices] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [numNotifications, setNumNotifications] = useState(0);
    const [noticeCount, setNoticeCount] = useState(0);
    const [firstCount, setfirstCount] = useState(0);
    const outside = useRef();
    const [logInUser] = useCookies(['logInUser']);
    const [serverTime, setServerTime] = useState(new Date());

    // 모달 열기 이벤트 핸들러
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기 이벤트 핸들러
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleClickOutside = ({ target }) => {
        if (isModalOpen && !outside.current.contains(target))
            setModalOpen(false);
    };

    useEffect(() => {
        const fetchNotices = () => {
            const invitationApiUrl = `/api/notice/getusernotices`;
    
            axios
                .get(invitationApiUrl)
                .then((response) => {
                    console.log('invitation is done', response);
                    setNotices(response.data);
                    setNumNotifications(response.data.length);
    
                    if (noticeCount < response.data.length && firstCount == 1 && logInUser.logInUser !== response.data[response.data.length - 1].roomName.split('-')[0]) {
                        toast.success('새로운 알림이 있습니다.', {
                            position: 'top-center',
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        });
                    }
                    setNoticeCount(response.data.length);
                    setfirstCount(1);
                })
                .catch((error) => {
                    console.error('invitation is not done', error);
                });
        };

        const fetchServerTime = async() => {
            try {
                const response = await axios.get('/api/notice/getnoticetimer');
                const { currentTime } = response.data;
                setServerTime(new Date(currentTime));
            } catch (error) {
                console.error('Failed to fetch server time', error);
            }
        };

        fetchNotices(); // Fetch initially
        fetchServerTime();
    
        const intervalId = setInterval(fetchNotices, 2000); // Fetch every 2 seconds
    
        window.addEventListener('click', handleClickOutside);
        return () => {
            clearInterval(intervalId); // Clear the interval on component unmount
            window.removeEventListener('click', handleClickOutside);
        };

    }, [noticeCount, firstCount]);

    const enterRoomHandler = (notice) => {
        console.log(notice);
        setCookie('roomName', notice.roomName, { path: '/' });
        window.location.href = '/meeting';
    }

    const AlarmTimer = ({ timestamp, serverTime }) => {
        const [counter, setCounter] = useState(calculateTimeDifference(timestamp, serverTime));
    
        useEffect(() => {
            const interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 60000);
    
            return () => clearInterval(interval);
        }, [timestamp, serverTime]);
    
        return <>{counter}</>;
    };
    
    const calculateTimeDifference = (timestamp, serverTime) => {
        const timeDifferenceMinutes = Math.floor((serverTime - new Date(timestamp)) / (1000 * 60));
    
        if (timeDifferenceMinutes < 1) {
            return '방금 전';
        } else if (timeDifferenceMinutes < 60) {
            return timeDifferenceMinutes + '분 전';
        } else if (timeDifferenceMinutes < 1440) {
            return Math.floor(timeDifferenceMinutes / 60) + '시간 전';
        } else {
            return Math.floor(timeDifferenceMinutes / 1440) + '일 전';
        }
    };
    

    return (
        <div className={styles.header_member__block}>
            <button
                variant='light'
                onClick={isModalOpen ? handleCloseModal : handleOpenModal}
            >
                <Bell />
                {numNotifications > 0 && <span id='badge' className={`${styles.notification_count} ${styles.badge}`}>{numNotifications}</span>}
            </button>
            <ToastContainer
                className={styles.toastify}
                position='top-center'
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light' 
            />
            {isModalOpen && (
                <>
                    <div
                        className={styles.modal_overlay}
                        onClick={handleCloseModal}
                    ></div>
                    <div
                        data-layer='newsfeed'
                        className={styles.layer_header_member}
                        ref={outside}
                        onClick={(e) => {
                            if (e.target === outside.current)
                                setModalOpen(false);
                        }}
                    >
                        <div className={styles.newfeed_container}>
                            <div className={styles.newsfeed_header}>
                                <p className={styles.newsfeed_header_notice}>
                                    입장 후 접속이 끊기면 알림창을 통해서
                                    재입장이 가능합니다.
                                    <br />
                                    알림이 오지 않을 시 새로고침을 해 보세요!
                                </p>
                                <button
                                    type='button'
                                    className={styles.newsfeed_close_button}
                                    onClick={handleCloseModal}
                                >
                                    <ExitButton />
                                </button>
                            </div>
                            {/*  */}
                            <div className={styles.newsfeed_list_container}>
                                <ul>
                                    {notices.map((notice) => (
                                        <li className={styles.newsfeed_item} onClick={() => enterRoomHandler(notice)}>
                                            {/* a태그 생략 */}
                                            <div
                                                className={
                                                    styles.newsfeed_item_read
                                                }
                                                style={{ display: 'none' }}
                                            ></div>
                                            <div
                                                className={
                                                    styles.newsfeed_item_container
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.newsfeed_item_infobox
                                                    }
                                                >
                                                    <p
                                                        className={
                                                            styles.newsfeed_item_infobox__date
                                                        }
                                                    >
                                                        초대정보 · <AlarmTimer timestamp={notice.noticeDate} serverTime={serverTime} />
                                                    </p>
                                                    <h3
                                                        className={
                                                            styles.newsfeed_item_infobox__title
                                                        }
                                                    >
                                                        {notice.noticeSender}님과의 멘토링이
                                                        활성화 되었습니다.
                                                    </h3>
                                                    <p
                                                        className={
                                                            styles.newsfeed_item_infobox__message
                                                        }
                                                    >
                                                        클릭시,
                                                        미팅방으로 입장됩니다. 💻
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.layer_header_member__arrow}>
                            <ArrowModal />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AlarmModal;
