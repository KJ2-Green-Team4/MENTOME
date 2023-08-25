import Dropdown from 'react-bootstrap/Dropdown';
import { Person } from 'react-bootstrap-icons';
import { useLogoutUser } from '../../../Authentication/LogOutUser/LogoutUser';
function TopbarDropdown() {
    const logoutUser = useLogoutUser();

    const handleLogout = () => {
        console.log('LogoutUser');
        logoutUser();
    };
    return (
        <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                <Person />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {/* <Dropdown.Item href="mypage">마이 페이지</Dropdown.Item>
                <Dropdown.Item href="http://localhost:5000/meeting">멘토링 신청하기</Dropdown.Item>
                <Dropdown.Item href="account-setting">설정</Dropdown.Item> */}
                <Dropdown.Item href="/" onClick={handleLogout}>
                    로그아웃
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default TopbarDropdown;
