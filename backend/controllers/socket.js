const http = require('http');

const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const videoStateMap = new Map();

// Function to get public rooms
function publicRooms() {
    const {
        sockets: {
            adapter: { 
                sids,
                rooms
            }
        }
    } = io;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

// Function to count rooms
function countRoom(roomName) {
    return io.sockets.adapter.rooms.get(roomName)?.size;
}

exports.socketManagement = io => {
    io.on("connection", (socket) => {
        socket.on("join_room", (roomName) => {
            socket.join(roomName);
            socket.to(roomName).emit("welcome");
        });
        socket.on("offer", (offer, roomName) => {
            socket.to(roomName).emit("offer", offer);
        });
        socket.on("answer", (answer, roomName) => {
            socket.to(roomName).emit("answer", answer);
        });
        socket.on("ice", (ice, roomName) => {
            socket.to(roomName).emit("ice", ice);
        });
    
        // Handle nickname and messages
        // socket["nickname"] = "Anon";
        socket["nickname"] = socket.handshake.headers.cookie
                .split("; ")
                .find((row) => row.startsWith("logInUser="))
                .split("=")[1];
        socket.onAny((event) => {
            // console.log(io.sockets.adapter);
            // console.log(`socket Event: ${event}`);
        });
        socket.on("enter_room", (roomName, done) => {
            socket.join(roomName);
            done();
            socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
            io.sockets.emit("room_change", publicRooms());
        });
        socket.on("disconnecting", () => {
            socket.rooms.forEach((room) =>
                socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
            );
            socket.on("disconnect", () => {
                io.sockets.emit("room_change", publicRooms());
            });
        });
        socket.on("new_message", (msg, room, done) => {
            socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
            done();
        });
        socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
    
        // 파일 업로드 관련 (파일 url 전달)
        socket.on("file_uploaded", (url, roomName) => {
            socket.to(roomName).emit("new_file", url);
        });
    
        socket.on("file_uploaded2", (url, roomName) => {
            socket.to(roomName).emit("new_file2", url);
        });
    
        // 동영상 동기화
        socket.on("play_video", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying = true;
            } else {
                videoState = { isPlaying: true, time: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("play_video", videoState.time);
        });
    
        socket.on("pause_video", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying = false;
            } else {
                videoState = { isPlaying: false, time: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("pause_video", videoState.time);
        });
    
        socket.on("seek_video", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time = timestamp;
            } else {
                videoState = { isPlaying: false, time: timestamp };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("seek_video", videoState.time);
        });
    
        socket.on("update_time", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time = timestamp;
            } else {
                videoState = { isPlaying: false, time: timestamp };
            }
            videoStateMap.set(roomName, videoState);
        });
    
        // 동영상 동기화2
        socket.on("play_video2", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying2 = true;
            } else {
                videoState = { isPlaying2: true, time2: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("play_video2", videoState.time2);
        });
    
        socket.on("pause_video2", (roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.isPlaying2 = false;
            } else {
                videoState = { isPlaying2: false, time2: 0 };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("pause_video2", videoState.time2);
        });
    
        socket.on("seek_video2", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time2 = timestamp;
            } else {
                videoState = { isPlaying2: false, time2: timestamp };
            }
            videoStateMap.set(roomName, videoState);
            socket.to(roomName).emit("seek_video2", videoState.time2);
        });
    
        socket.on("update_time2", (timestamp, roomName) => {
            let videoState = videoStateMap.get(roomName);
            if (videoState) {
                videoState.time2 = timestamp;
            } else {
                videoState = { isPlaying2: false, time2: timestamp };
            }
            videoStateMap.set(roomName, videoState);
        });
    
        // 캔버스 동기화
        socket.on("drawing", (data) => {
            // Broadcast the drawing data to other clients in the same room
            socket.to(data.roomName).emit("drawing", data);
        });
    
        socket.on("clear_canvas", (roomName) => {
            socket.to(roomName).emit("clear_canvas");
        });

        // 캔버스 토글 상태 동기화
        socket.on("toggle_drawCanvas", (data) => {
            // Broadcast the drawCanvas state to other clients in the same room
            socket.to(data.roomName).emit("toggle_drawCanvas", { state: data.state });
        });
        
        socket.on("toggleCanvasToServer", (roomName) => {
            // Broadcast the drawCanvas state to other clients in the same room
            socket.to(roomName).emit("toggleCanvasToClient");
        });

        // 유사도 계산 내보내기
        socket.on("similarity_results", (results, roomName) => {
            socket.to(roomName).emit("new_similarity_results", results);
        });

        // skeleton 사용자간 동기화
        socket.on('toggleSkeleton', (enabled) => {
            // 이 이벤트를 보낸 클라이언트를 제외한 다른 클라이언트에게 브로드캐스팅
            socket.broadcast.emit('toggleSkeleton', enabled);
        });

        // skeleton2 사용자간 동기화
        socket.on('toggleSkeleton2', (enabled) => {
            // 이 이벤트를 보낸 클라이언트를 제외한 다른 클라이언트에게 브로드캐스팅
            socket.broadcast.emit('toggleSkeleton2', enabled);
        });

        // 동영상1 리사이즈, 드래그 동기화
        socket.on("resize_video_container", (data, roomName) => {
            socket.to(roomName).emit("resize_video_container", data);
        });
        socket.on("drag_video_container", (data, roomName) => {
            socket.to(roomName).emit("drag_video_container", data);
        });

        // 동영상2 리사이즈, 드래그 동기화
        socket.on("resize_video_container2", (data, roomName) => {
            socket.to(roomName).emit("resize_video_container2", data);
        });
        socket.on("drag_video_container2", (data, roomName) => {
            socket.to(roomName).emit("drag_video_container2", data);
        });

        // 임펙트 동기화
        socket.on("doImpactReset", (roomName) => {
            socket.to(roomName).emit("doImpactReset");
        });
        socket.on("impact1", (roomName) => {
            socket.to(roomName).emit("impact1");
        });
        socket.on("impact2", (roomName) => {
            socket.to(roomName).emit("impact2");
        });
        socket.on("impact3", (roomName) => {
            socket.to(roomName).emit("impact3");
        });

        socket.on('resize_wb',function(webcamData,roomName){
            socket.to(roomName).emit('resize_wb', webcamData);
        });

        // 파일 업로드 toggle 동기화
        socket.on("fileuploadtoggleToServer1", (roomName) => {
            socket.to(roomName).emit("fileuploadtoggleToClient1");
        });

        socket.on("fileuploadtoggleToServer2", (roomName) => {
            socket.to(roomName).emit("fileuploadtoggleToClient2");
        });
    });
};
