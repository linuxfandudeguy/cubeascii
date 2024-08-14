const express = require('express');
const app = express();

let A = 0, B = 0, C = 0;

const width = 160, height = 44;
let zBuffer = new Array(width * height).fill(0);
let buffer = new Array(width * height).fill('.');
const backgroundASCIICode = '.';
const distanceFromCam = 100;
const K1 = 40;
const incrementSpeed = 0.6;

function calculateX(i, j, k) {
  return j * Math.sin(A) * Math.sin(B) * Math.cos(C) -
         k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
         j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + 
         i * Math.cos(B) * Math.cos(C);
}

function calculateY(i, j, k) {
  return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) -
         j * Math.sin(A) * Math.sin(B) * Math.sin(C) + 
         k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
         i * Math.cos(B) * Math.sin(C);
}

function calculateZ(i, j, k) {
  return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + 
         i * Math.sin(B);
}

function calculateForSurface(cubeX, cubeY, cubeZ, ch) {
  const x = calculateX(cubeX, cubeY, cubeZ);
  const y = calculateY(cubeX, cubeY, cubeZ);
  const z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;

  const ooz = 1 / z;

  const xp = Math.floor(width / 2 + K1 * ooz * x * 2);
  const yp = Math.floor(height / 2 + K1 * ooz * y);

  const idx = xp + yp * width;
  if (idx >= 0 && idx < width * height) {
    if (ooz > zBuffer[idx]) {
      zBuffer[idx] = ooz;
      buffer[idx] = ch;
    }
  }
}

function renderFrame() {
  zBuffer.fill(0);
  buffer.fill(backgroundASCIICode);

  let cubeWidth = 20;
  let horizontalOffset = -2 * cubeWidth;
  for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
    for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
      calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
      calculateForSurface(cubeWidth, cubeY, cubeX, '$');
      calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
      calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
      calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
      calculateForSurface(cubeX, cubeWidth, cubeY, '+');
    }
  }

  cubeWidth = 10;
  horizontalOffset = 1 * cubeWidth;
  for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
    for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
      calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
      calculateForSurface(cubeWidth, cubeY, cubeX, '$');
      calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
      calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
      calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
      calculateForSurface(cubeX, cubeWidth, cubeY, '+');
    }
  }

  cubeWidth = 5;
  horizontalOffset = 8 * cubeWidth;
  for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
    for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
      calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
      calculateForSurface(cubeWidth, cubeY, cubeX, '$');
      calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
      calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
      calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
      calculateForSurface(cubeX, cubeWidth, cubeY, '+');
    }
  }

  A += 0.05;
  B += 0.05;
  C += 0.01;

  let output = '';
  for (let i = 0; i < buffer.length; i++) {
    output += i % width === 0 ? '\n' : '';
    output += buffer[i];
  }
  return output;
}

exports.handler = async (event, context) => {
  const response = renderFrame();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: response,
  };
};
