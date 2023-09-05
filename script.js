const drawingCanvas = document.getElementById('drawingCanvas');
const context = drawingCanvas.getContext('2d');
let isDrawing = false;
let isPenMode = false;
const resetButton = document.getElementById('resetButton');
const colorPicker = document.getElementById('colorPicker');
const penCursorButton = document.getElementById('penCursorButton');

penCursorButton.addEventListener('click', () => {
    isPenMode = !isPenMode;
    updateCursor();
});

drawingCanvas.addEventListener('mousedown', () => {
    if (isPenMode) {
        isDrawing = true;
        context.beginPath();
    }
});

drawingCanvas.addEventListener('mousemove', draw);

drawingCanvas.addEventListener('mouseup', () => {
    if (isPenMode && isDrawing) {
        isDrawing = false;
        context.closePath();
    }
});

drawingCanvas.addEventListener('mouseout', () => {
    if (isPenMode && isDrawing) {
        isDrawing = false;
        context.closePath();
    }
});


function draw(e) {
    if (!isDrawing) return;

    context.lineWidth = 2;
    context.strokeStyle = colorPicker.value;

    context.lineTo(e.clientX - drawingCanvas.getBoundingClientRect().left, e.clientY - drawingCanvas.getBoundingClientRect().top);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - drawingCanvas.getBoundingClientRect().left, e.clientY - drawingCanvas.getBoundingClientRect().top);
}

resetButton.addEventListener('click', () => {
    context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
});

