/* Step1: Prepare the canvas and get WebGL context */

const canvas = document.getElementById('my_Canvas');
const gl = canvas.getContext('experimental-webgl');

/* Step2: Define the geometry and store it in buffer objects */

// var vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,1,1, 0.4,0.1];

let vertices = colocaEmOrdem(obtemPontos(1,4)).flat();
vertices = vertices.map((v)=>v*0.5)


// Create a new buffer object
let vertex_buffer = gl.createBuffer();

// Bind an empty array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Pass the vertices data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

/* Step3: Create and compile Shader programs */

// Vertex shader source code
const vertCode =
    'attribute vec2 coordinates;' + 
    'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';

//Create a vertex shader object
const vertShader = gl.createShader(gl.VERTEX_SHADER);

//Attach vertex shader source code
gl.shaderSource(vertShader, vertCode);

//Compile the vertex shader
gl.compileShader(vertShader);

//Fragment shader source code
const fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';

// Create fragment shader object
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

// Attach fragment shader source code
gl.shaderSource(fragShader, fragCode);

// Compile the fragment shader
gl.compileShader(fragShader);

// Create a shader program object to store combined shader program
const shaderProgram = gl.createProgram();

// Attach a vertex shader
gl.attachShader(shaderProgram, vertShader); 

// Attach a fragment shader
gl.attachShader(shaderProgram, fragShader);

// Link both programs
gl.linkProgram(shaderProgram);

// Use the combined shader program object
gl.useProgram(shaderProgram);

/* Step 4: Associate the shader programs to buffer objects */

//Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

//Get the attribute location
const coord = gl.getAttribLocation(shaderProgram, "coordinates");

//point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

//Enable the attribute
gl.enableVertexAttribArray(coord);

/* Step5: Drawing the required object (triangle) */

// Clear the canvas
gl.clearColor(0.5, 0.5, 0.5, 0.9);

// Enable the depth test
gl.enable(gl.DEPTH_TEST); 

// Clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// Set the view port
gl.viewport(0,0,canvas.width,canvas.height);

// Draw the triangle
gl.drawArrays(gl.LINE_LOOP, 0, vertices.length/2);