// 메인 페이지

import React from 'react';
import Header from '../Components/Home/Header/Header';
import RegisterGuide from '../Components/Home/RegisterGuide/RegisterGuide';
import MainMenteeCard from '../Components/Home/MentoringWrappers/Main/MainMenteeCard';
import MainMentorCard from '../Components/Home/MentoringWrappers/Main/MainMentorCard';
import { Container, Row } from 'react-bootstrap';

import IntroTitle from '../Components/UI/IntroTitle/IntroTitle';

function Home() {
    return (
        <>
            <div>
                <Header />

                <RegisterGuide />
                <Container>
                    <IntroTitle name="멘토" url="mentor" />
                    <Row>
                        {/* <PostCard /> */}
                        <MainMentorCard />
                    </Row>
                </Container>
                <Container>
                    <IntroTitle name="멘티" url="mentee" />
                    <Row>
                        <MainMenteeCard />
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Home;
