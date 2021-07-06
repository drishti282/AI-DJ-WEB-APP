song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function setup() {
  canvas = createCanvas(420, 400);
  canvas.position(425, 250);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function preload() {
  song = loadSound("sound.mp3");
}
function play1() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}
function modelLoaded() {
  console.log("Pose Net Is Initialized");
}
function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreleftWrist =" + scoreleftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist X is " + leftWristX);
    console.log("left wrist Y is " + leftWristY);
    scorerightWrist = results[0].pose.keypoints[10].score;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist X is " + rightWristX);
    console.log("right wrist Y is " + rightWristY);
  }
}
function draw() {
  image(video, 0, 0, 420, 400);
  if (scorerightWrist > 0.2) {
    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "Speed = 1x";
      song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "Speed = 1.5x";
      song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      song.rate(2);
    }
    circle(rightWristX, rightWristY, 20);
  }

  if (scoreleftWrist > 0.2) {
    fill("#000000");
    stroke("#5cffce");
    circle(leftWristX, leftWristY, 20);
    inNumberlwY = Number(leftWristY);
    decimal = floor(inNumberlwY);
    console.log(decimal);
    volume = decimal / 500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
  }
}
