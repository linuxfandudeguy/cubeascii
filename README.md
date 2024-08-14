# cubeascii
###### (c) Copyright 2024 linuxfandudeguy

![Static Badge](https://img.shields.io/badge/certified_node.js_project-green?logo=nodedotjs&logoColor=white) ![Static Badge](https://img.shields.io/badge/certified_netlify_project-blue?logo=netlify&logoColor=white) ![Static Badge](https://img.shields.io/badge/certified_express_project-gray?logo=express&logoColor=white)

<img src="https://skillicons.dev/icons?i=nodejs,express,netlify" alt="web dev" height="40"/>

# Info

`cubeascii` is a api written in Node.js with Express.js.



Each time you make a HTTP request, the `cubeascii` api will display a frame from a 3D animation of a cube spinning in ASCII art.

In order to make an animation out of this you would need to make a HTTP GET request with cURL to [`https://cubeascii.netlify.app
`](https://cubeascii.netlify.app/)every 0.1 seconds which is why it's recommended to automate the requests.
