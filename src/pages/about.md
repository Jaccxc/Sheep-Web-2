---
title: About
---

<div class="text-center">
  <!-- You can use Vue components inside markdown -->
  <div i-carbon-dicom-overlay class="text-4xl -mb-6 m-auto" />
  <h3>About</h3>
</div>


## Introduction

[This system](https://github.com/Jaccxc/Sheep-Detection) is an goat detection system focusing on real-world camera analysis. Core technologies include [YoloV7](https://github.com/WongKinYiu/yolov7) for goat bounding with real-world fisheye lens camera images, [DeepSORT](https://github.com/nwojke/deep_sort) for object tracking, implemented with [Kalman Filter](https://github.com/nwojke/deep_sort/blob/master/deep_sort/kalman_filter.py) and [NearestNeigborMatching](https://github.com/nwojke/deep_sort/blob/master/deep_sort/nn_matching.py).

As goats are tracked, the data are stored in the database using [SQLite3](https://www.sqlite.org/index.html). With a python server as the API server, we are able to fetch data from the database. The server also acts as a [Web Server](https://github.com/Jaccxc/Sheep-Web-2), which is implemented with [antfu's Vitesse](https://github.com/antfu/vitesse) with [Vue3](https://github.com/vuejs/core), [Typescript](https://www.typescriptlang.org/), [Pinia](https://pinia.vuejs.org/).

---

## Usage

To deploy the full system, we first have to understand the full structure of the system.

#### 1. **Raspberry Pi**
   - Recording Script - Used to record using webcam with certain resolution and FPS.
   - Video File Sending Script - Used to send recorded video file to the main server. 
#### 2. **Main Server**
   - Goat Recognition Script - Used to scan and process video data with YoloV7 and DeepSORT. 
   - RESTful API - Used to create a interface to fetch data from database. 
   - Vitesse Web Server - Used to deploy a web server with docker and nginx. 

### Raspberry Pi - Recording Script

```bash
# run the script in the raspberry pi terminal 1
cd ~/camSend/
python3 app_record.py
```
### Raspberry Pi - Video File Sending Script

```bash
# run the script in the raspberry pi terminal 2
cd ~/camSend/
python3 app_send_file.py
```
### Main Server -  Goat Recognition Script

```bash
# run the script in the main server terminal 1
cd ~/Sheep-Detection/sheepRecognition/
python3 script.py
```
### Main Server -  RESTful API

```bash
# run the script in the main server terminal 2
cd ~/Sheep-Detection/RESTapi/
python3 api_server.py
```

### Main Server -  Vitesse Web Server

```bash
# run the script in the main server terminal 3
cd ~/Sheep-Detection/web/Sheep-Web-2/
sudo docker run --rm -it -p 80:80 -p 443:443 -p 8080:8080 vitesse:latest
```

Check out the [GitHub repo](https://github.com/Jaccxc/Sheep-Detection) for more details.
