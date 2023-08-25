// pose1의 기준점 좌표를 받아오는 함수
// x,y,신뢰도
function extractSkeletonCoordinates(results, bodyPart) {
    const skeletonCoordinates = [];
    let indices;
    if (bodyPart === 'upperBody') {
        indices = [0, 11, 12, 13, 14, 15, 16, 23, 24];
    } else if (bodyPart === 'lowerBody') {
        indices = [23, 24, 25, 26, 27, 28];
    } else {
        indices = [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
    }

    // let totalConfidence = 0;
    // let count = 0;

    // if (results && results.poseLandmarks) {
    //     indices.forEach((index) => {
    //         totalConfidence += results.poseLandmarks[index].visibility;
    //         count++;
    //     });

        // const avgConfidence = totalConfidence / count;

        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            let confidence = results.poseLandmarks[index].visibility;

            // if (confidence < 0.5) {
            //     confidence = avgConfidence;
            // }

            skeletonCoordinates.push({ x, y, confidence });
        });
    // }

    return skeletonCoordinates;
}

// pose2의 기준점 좌표를 받아오는 함수
// x,y,신뢰도
function extractSkeletonCoordinates2(results, bodyPart) {
    const skeletonCoordinates2 = [];
    let indices;
    if (bodyPart === 'upperBody') {
        indices = [0, 11, 12, 13, 14, 15, 16, 23, 24];
    } else if (bodyPart === 'lowerBody') {
        indices = [23, 24, 25, 26, 27, 28];
    } else {
        indices = [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
    }

    // let totalConfidence = 0;
    // let count = 0;

    // if (results && results.poseLandmarks) {
    //     indices.forEach((index) => {
    //         totalConfidence += results.poseLandmarks[index].visibility;
    //         count++;
    //     });

    //     const avgConfidence = totalConfidence / count;

        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            let confidence = results.poseLandmarks[index].visibility;

            // if (confidence < 0.5) {
            //     confidence = avgConfidence;
            // }

            skeletonCoordinates2.push({ x, y, confidence });
        });
    // }

    return skeletonCoordinates2;
}


// 함수: weightedDistanceMatching
/* 두 포즈(2차원 좌표벡터) 사이의 가중거리를 계산하는 함수 
    점들 사이의 거리를 측정 */ 
    // 유클리디안 거리 법으로 바꿈
// function weightedDistanceMatching(vectorPose1XY, vectorPose2XY, vectorConfidences) {
//     const summation1 = 1 / vectorConfidences[vectorConfidences.length - 1];
//     var summation2 = 0;

//     for (var i = 0; i < vectorPose1XY.length; i++) {
//         var confIndex = Math.floor(i / 2);
//         summation2 += vectorConfidences[confIndex] * Math.abs(vectorPose1XY[i] - vectorPose2XY[i]);
//     }
//     return summation1 * summation2;
// }
function weightedEuclideanDistanceMatching(vectorPose1XY, vectorPose2XY, vectorConfidences) {
    const averageConfidence = vectorConfidences.reduce((acc, val) => acc + val, 0) / vectorConfidences.length;
    const summation1 = 1 / averageConfidence;
    var summation2 = 0;

    for (var i = 0; i < vectorPose1XY.length; i+=2) {  // increment by 2 to consider (x,y) pairs
        var xDiff = vectorPose1XY[i] - vectorPose2XY[i];
        var yDiff = vectorPose1XY[i+1] - vectorPose2XY[i+1];
        
        var distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);  // Euclidean distance for (x,y) pair

        summation2 += vectorConfidences[i/2] * distance;  // apply confidence weighting
    }
    return summation1 * summation2;
}

// 함수: convertPoseToVector
/*포즈 데이터를 처리하여 2차원 벡터 형식으로 변환하고, 신뢰도를 추출하여 x,y좌표의 최소값과 최대값을 기반으로 스케일링 요소 계산 */
function convertPoseToVector(pose) {
    var vectorPoseXY = [];
    var vectorPoseConfidences = [];
    var translateX = Number.POSITIVE_INFINITY;
    var translateY = Number.POSITIVE_INFINITY;
    var scaler = Number.NEGATIVE_INFINITY;

    pose.forEach(function (point) {
        var x = point.x;
        var y = point.y;
        vectorPoseXY.push(x, y);
        translateX = Math.min(translateX, x);
        translateY = Math.min(translateY, y);
        scaler = Math.max(scaler, Math.max(x, y));
        vectorPoseConfidences.push(point.confidence);
    });

    return [vectorPoseXY, vectorPoseConfidences, [translateX / scaler, translateY / scaler, scaler]];
}

// 함수: scaleAndTranslate
// 2차원 포즈 벡터를 스케일링하고 변환하는 작업 -> 정규화하는 데 사용가능 
function scaleAndTranslate(vectorPoseXY, transformValues) {
    var transX = transformValues[0],
        transY = transformValues[1],
        scaler = transformValues[2];
    return vectorPoseXY.map(function (position, index) {
        return index % 2 === 0 ? position / scaler - transX : position / scaler - transY;
    });
}

// 함수: L2Normalization
// 과적합 방지 ,
function L2Normalization(vectorPoseXY) {
    var absVectorPoseXY = 0;
    vectorPoseXY.forEach(function (position) {
        absVectorPoseXY += Math.pow(position, 2);
    });
    absVectorPoseXY = Math.sqrt(absVectorPoseXY);
    return vectorPoseXY.map(function (position) {
        return position / absVectorPoseXY;
    });
}

// 함수: vectorizeAndNormalize
function vectorizeAndNormalize(pose) {
    var _a = convertPoseToVector(pose);
    var vectorPoseXY = _a[0];
    var vectorPoseTransform = _a[2];
    var vectorPoseConfidences = _a[1];

    vectorPoseXY = scaleAndTranslate(vectorPoseXY, vectorPoseTransform);
    vectorPoseXY = L2Normalization(vectorPoseXY);

    return [vectorPoseXY, vectorPoseConfidences];
}

// 함수: poseSimilarity -> 가중거리 와 신뢰도 이용
function poseSimilarity(pose1, pose2) {
    var _a = vectorizeAndNormalize(pose1);
    var vectorPose1XY = _a[0];
    var vectorPose1Scores = _a[1];

    var vectorPose2XY = vectorizeAndNormalize(pose2)[0];
    return weightedEuclideanDistanceMatching(vectorPose1XY, vectorPose2XY, vectorPose1Scores);
}


function normalizeAndCalculatePercentage(similarity, minPossibleDist, maxPossibleDist) {

    similarity = Math.max(minPossibleDist, Math.min(similarity, maxPossibleDist));
    var similarityNormalized = (similarity - minPossibleDist) / (maxPossibleDist - minPossibleDist); // 유사도 정규화

    var similarityPercentage = (1 - similarityNormalized) * 100;
    return similarityPercentage.toFixed(2);
}

let upperBodySimilarityPercentage = '';
let lowerBodySimilarityPercentage = '';
let fullBodySimilarityPercentage = '';


function calculateSimilarity() {
    // console.log("Video 1 Skeleton Coordinates:", video1SkeletonCoordinates);
    // console.log("Video 2 Skeleton Coordinates:", video2SkeletonCoordinates);

    if (video1upperBodySkeletonCoordinates.length > 0 && video2upperBodySkeletonCoordinates.length > 0) {

        // const maxFullBodySimilarity = 2;
        // const minFullBodySimilarity = 0.25;

        const maxUpperBodySimilarity = 2.8;
        const minUpperBodySimilarity = 0;

        const maxLowerBodySimilarity = 1.9;
        const minLowerBodySimilarity = 0;


        // const similarity = poseSimilarity(video1SkeletonCoordinates, video2SkeletonCoordinates);
        const uppersimilarity = poseSimilarity(video1upperBodySkeletonCoordinates, video2upperBodySkeletonCoordinates);
        const lowersimilarity = poseSimilarity(video1lowerBodySkeletonCoordinates, video2lowerBodySkeletonCoordinates);

        // console.log("전체" + similarity);
        console.log("상체" + uppersimilarity);
        console.log("하체" + lowersimilarity);




        // const fullBodySimilarityPercentage = normalizeAndCalculatePercentage(similarity,minFullBodySimilarity,maxFullBodySimilarity);

        upperBodySimilarityPercentage = normalizeAndCalculatePercentage(uppersimilarity, minUpperBodySimilarity, maxUpperBodySimilarity);
        lowerBodySimilarityPercentage = normalizeAndCalculatePercentage(lowersimilarity, minLowerBodySimilarity, maxLowerBodySimilarity);
        fullBodySimilarityPercentage = (((parseFloat(upperBodySimilarityPercentage) + parseFloat(lowerBodySimilarityPercentage)) / 2).toFixed(2));

        console.log("Pose Similarity Percentage:", fullBodySimilarityPercentage, "%");
        console.log("Upper body Pose Similarity Percentage:", upperBodySimilarityPercentage, "%");
        console.log("Lower body Pose Similarity Percentage:", lowerBodySimilarityPercentage, "%");
        

    } else {
        console.log("스켈레톤 이미지가 없습니다");
    }
}


    const measureSimilarityButton = document.getElementById('measureSimilarity');
   

    $.getScript("similarity.js?_=" + Date.now(), function() {
        measureSimilarityButton.addEventListener('click', calculateSimilarity);
        // 파일이 로드되고 난 후 실행될 코드
        $(document).ready(function () {
            $('#measureSimilarity').click(function () {
                $('.full-body-similarity').text(fullBodySimilarityPercentage);
                $('.upper-body-similarity').text(upperBodySimilarityPercentage);
                $('.lower-body-similarity').text(lowerBodySimilarityPercentage);
    
                $('.alert').addClass("show");
                $('.alert').removeClass("hide");
                $('.alert').addClass("showAlert");
    
                setTimeout(function () {
                    $('.alert').removeClass("show");
                    $('.alert').addClass("hide");
                }, 3000);

                // 내보내기 - 김현수 추가
                const results = {
                    fullBodySimilarityPercentage: fullBodySimilarityPercentage,
                    upperBodySimilarityPercentage: upperBodySimilarityPercentage,
                    lowerBodySimilarityPercentage: lowerBodySimilarityPercentage
                };
                socket.emit("similarity_results", results, roomName);
            });
    
            $('.close-btn').click(function () {
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
            });
        });
    });

    // 메시지 내보내기
    socket.on("new_similarity_results", (results) => {
        const full = results.fullBodySimilarityPercentage;
        const upper = results.upperBodySimilarityPercentage;
        const lower = results.lowerBodySimilarityPercentage;

        console.log(full, '1');
        $('.full-body-similarity').text(full);
        $('.upper-body-similarity').text(upper);
        $('.lower-body-similarity').text(lower);

        $('.alert').addClass("show");
        $('.alert').removeClass("hide");
        $('.alert').addClass("showAlert");

        setTimeout(function () {
            $('.alert').removeClass("show");
            $('.alert').addClass("hide");
        }, 3000);
    });

    function showAlert() {
        console.log("하잇!");
        socket.emit('alertsimilToServer', roomName);
        // 예시 값을 설정합니다.
        // document.querySelector('.full-body-similarity').textContent = '85';
        // document.querySelector('.upper-body-similarity').textContent = '80';
        // document.querySelector('.lower-body-similarity').textContent = '90';

        // 알림창을 하단 바 위로 이동 (하단 바의 높이를 4rem으로 설정)
        document.getElementById('similarityAlert').style.bottom = '6rem';

        // 3초 후에 알림창을 다시 화면 밖으로 이동
        setTimeout(() => {
            document.getElementById('similarityAlert').style.bottom = '-300px';
        }, 3000);
    }

    socket.on('alertsimilToClient', () => {
        document.getElementById('similarityAlert').style.bottom = '6rem';

        // 3초 후에 알림창을 다시 화면 밖으로 이동
        setTimeout(() => {
            document.getElementById('similarityAlert').style.bottom = '-300px';
        }, 3000);
    });