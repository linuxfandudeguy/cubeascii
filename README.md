# cubeascii
###### (c) Copyright 2024 linuxfandudeguy

![Static Badge](https://img.shields.io/badge/certified_node.js_project-green?logo=nodedotjs&logoColor=white) ![Static Badge](https://img.shields.io/badge/certified_netlify_project-blue?logo=netlify&logoColor=white) ![Static Badge](https://img.shields.io/badge/certified_express_project-gray?logo=express&logoColor=white)

<img src="https://skillicons.dev/icons?i=nodejs,express,netlify" alt="web dev" height="40"/>

# Info

`cubeascii` is a api written in Node.js with Express.js.

`cubeascii` is based off of [cube.c](https://github.com/servetgulnaroglu/cube.c/tree/master) by [@servetgulnaroglu](https://github.com/servetgulnaroglu)

Each time you make a HTTP request, the `cubeascii` api will display a frame from a 3D animation of a cube spinning in ASCII art.

In order to make an animation out of this you would need to make a HTTP GET request with cURL to [`https://cubeascii.netlify.app
`](https://cubeascii.netlify.app/) every 0.02 seconds which is why it's recommended to automate the requests.

# Running Locally

To run `cubeascii` locally, you need to follow these instructions:

1. Clone the repo

```bash
git clone https://github.com/linuxfandudeguy/cubeascii.git
```
2. Enter the directory

```bash
cd cubeascii
```
3. Running
```bash
node api/non_deployment_index.js
```

You have now successfully ran `cubeascii` locally.

# Automation

In order to make an animation out of this, you can simply run this command in your terminal:

```bash
while true; do
    curl https://cubeascii.netlify.app/
    sleep 0.02  # Adjust the sleep time as needed
done
```
## Locally Ran Automation

```bash
while true; do
    curl http://localhost:3000
    sleep 0.02  # Adjust the sleep time as needed
done
```
