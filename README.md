<div align="center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=05d183&height=200&section=header&text=🏌️‍♂️멘토미🏌️‍♀️&fontSize=60&&animation=fadeIn&fontAlignY=38&desc=&descAlignY=51&descAlign=62" alt="멘토미">
</div>


## 📖 목차

  

- [서비스 목적](#-서비스-목적)

- [개발 기간](#%EF%B8%8F-개발기간)

- [시연영상](#%EF%B8%8F-시연영상click)

- [Team members](#-team-members)

- [기술 스택](#%EF%B8%8F-기술-스택)

- [Architecture](#%EF%B8%8F-architecture)

- [주요 기능](#주요-기능)

	- [실시간 비대면 미팅룸](#실시간-비대면-미팅룸)

		- [화상통화 기능](#화상통화-기능)

		- [채팅, 그림판 기능](#채팅-그림판-기능)

		- [동영상 공유 기능](#동영상-공유-기능)

		- [캔버스 동기화 기능](#캔버스-동기화-기능)

	- [멘토링 툴](#멘토링-툴)

		- [스켈레톤 기능](#스켈레톤-기능)

		- [골프 스윙 임팩트 시점 이동 기능](#골프-스윙-임팩트-시점-이동-기능)

		- [유사도 측정 기능](#유사도-측정-기능)

- [포스터](#📝-포스터)

  

## 🌐 서비스 목적

  
> 요즘 인기 있는 숨고나 크몽과 같은 서비스들은 도움이 필요한 사람👨‍🎓 과 도움을 줄 수 있는 사람👨‍🏫 을 연결하는 플랫폼🚉 입니다.<br>

> 특히, 요즘에는 운동🏌️‍♂️분야에서도 활발하게 활용되고 있는 모습을 볼수 있습니다.<br>

> 하지만 대부분의 서비스가 대면 상황🤝 에 초점을 두고 운영되고 있어 시간⌚️과 공간🚧 제약이 있습니다.<br>

> 이에 비대면 운동 멘토링을 매칭하고 플랫폼🚉 을 제공하는 "멘토미" 서비스를 기획하게 되었습니다!<br>

  

## 🗓️ 개발기간

  

### **2023.07.03 ~ 2022.08.11**

  

## 📽️ 시연영상(click!)

<div  align="center">



[![Video Label](https://github.com/kelvin3476/MENTOME/assets/62060956/80e862fb-58b4-4b73-9504-156fc57fd680)
](https://github.com/kelvin3476/MENTOME/assets/62060956/03d15bfe-211b-47ed-b42a-e40b46a0d482)



</div>

<br>

  

## 👥 Team members

  
|               정영상                |                   김인제                   |                   김현수                   |                   이영훈                    |                 이승우                 |
| :---------------------------------: | :----------------------------------------: | :----------------------------------------: | :-----------------------------------------: | :-----------------------------------: |
| [Github](https://github.com/imagejung) | [Github](https://github.com/kijen723) | [Github](https://github.com/HyNS00) | [Github](https://github.com/kr-younghoon) | [Github](https://github.com/kelvin3476) |

  

<br  />

  

## 🛠️ 기술 스택

  

<p>

<img  height=40px  src="https://img.shields.io/badge/Socket.io-000000?style=flat&logo=socket.io&logoColor=white"/>
<img  height=40px  src="https://img.shields.io/badge/WebRTC-1aa7ec?style=flat&logo=webrtc&logoColor=white"/>
<img  height=40px  src="https://img.shields.io/badge/React-61DBFB?style=flat&logo=react&logoColor=white"/>
<img  height=40px  src="https://img.shields.io/badge/express-FFFF00?style=flat&logo=express&logoColor=black"/>
<img  height=40px  src="https://img.shields.io/badge/MongoDB%20-47A248?style=flat&logo=MongoDB&logoColor=white"/>
<img  height=40px  src="https://img.shields.io/badge/MediaPipe-008080?style=flat&logo=MediaPipe&logoColor=white" />
<img  height=40px  src="https://img.shields.io/badge/Amazon%20S3-ffa500?style=flat&logo=Amazon%20S3&logoColor=white"/>
<img  height=40px  src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white"/>

</p>

  

## ⚙️ Architecture

  

<div  align="center">

  

![아키텍쳐](https://github.com/kelvin3476/MENTOME/assets/62060956/d9df4752-41f5-4dec-a024-f8ad178a75fc)
  
</div>
  

<br/>

  

## ⭐주요 기능

  
## **실시간 비대면 미팅룸**

- 1️⃣ **화상통화 기능**

	- **WebRTC를 이용한 저딜레이 P2P 통신**

- 2️⃣ **채팅, 그림판 기능**

	- **Socket.io를 이용한 실시간 대화수단**

- 3️⃣ **동영상 공유 기능**

	- **Amazon S3를 사용하여 안정성과 다용도성 UP!**

- 4️⃣**캔버스 동기화 기능**	
	- **동영상 재생 여부, 재생 시간, UI의 크기 조절과 위치 조절까지!**
	- **화면 공유를 넘어서는 상호 컨트롤 액션**

<br>


### 화상통화 기능

  

- **P2P** 방식의 **WebRTC**기반 화상캠 구현

- **마이크** 및 **내 화면** On&Off 기능

- 미팅룸 **입장 및 퇴장**시 **음성 기능** 추가

<div  align="center">

 

  

</div>

<br>

  

### 채팅, 그림판 기능

  

- 같은 방의 사용자간에 **실시간 채팅 및 그림판** 기능 by **Socket.io**

- 사용자간에 **실시간 대화수단**으로 사용 가능

<div  align="center">

 

  

</div>

<br>

  

### 동영상 공유 기능

  

- Amazon S3에 동영상을 올려서 **다른 사용자 화면**에 **내가 올린 동영상을 공유** 할수 있는 기능

- 업로드 된 **동영상 리사이즈 기능** 추가

<div  align="center">

 

  

</div>

<br>

 

### 캔버스 동기화 기능


- **사용자간 캔버스 동기화** 를 통해 사용자가 실시간으로 그림 그리는것을 볼수 있도록 작업 by **Socket.io**
  
- 업로드 된 동영상 위에 그림을 그릴수 있도록 **사용자간 캔버스 동기화** by **Socket.io**


<div  align="center">


  
  

</div>

<br>

## **멘토링 툴**

- 1️⃣ **스켈레톤 기능**

	- **MediaPipe Pose 라이브러리를 이용한 스켈레톤 UI 제공** 
	- **시각화된 움직임을 제공하여 효율적인 멘토링 가능**  
	- **큰옷을입고있어도, 화질이떨어져도OK**

- 2️⃣ **골프 스윙 임팩트 시점 이동 기능**

	- **스켈레톤 좌표 기반으로 알고리즘을 구현하여 임팩트 시점 분석**
	- **버튼을 누르면 임팩트 시점으로 이동하여 원활한 멘토링 지원**

- 3️⃣ **유사도 측정 기능**

	- **스켈레톤 좌표 기반으로 유사도 측정**  
	- **유클리디안 거리에 가시성을 가중치로 적용**  
	- **양쪽 동영상 자세의 유사도를 측정하여 효율적인 멘토링 지원**


<br>


### 스켈레톤 기능

  

- **MediaPipe Pose 라이브러리를 이용한 스켈레톤 UI 제공** 
- **시각화된 움직임을 제공하여 효율적인 멘토링 가능**  
- **큰옷을입고있어도, 화질이떨어져도OK**


<div  align="center">

  



  

</div>

<br>

  

### 골프 스윙 임팩트 시점 이동 기능

  

- **스켈레톤 좌표 기반으로 알고리즘을 구현하여 임팩트 시점 분석**
- **버튼을 누르면 임팩트 시점으로 이동하여 원활한 멘토링 지원**


<div  align="center">

  



  

</div>

<br>

  

### 유사도 측정 기능

  

- **스켈레톤 좌표 기반으로 유사도 측정**  
- **유클리디안 거리에 가시성을 가중치로 적용**  
- **양쪽 동영상 자세의 유사도를 측정하여 효율적인 멘토링 지원**


<br>


<div  align="center">

  



  

</div>

  

## 📝 포스터

  

<div  align="center">

  

![Mentome](https://github.com/kelvin3476/MENTOME/assets/62060956/b3d06af8-8ba8-45e7-b171-873b1726bb54)

  

</div>
