// Toggle colorClass function
const toggleColorClass = (toggleItm, toggleClass) => {
     const toggleElement = document.querySelectorAll(toggleItm);
     toggleElement.forEach((element) => {
          element.addEventListener("click", () => {
               toggleElement.forEach((itm) => {
                    itm.classList.remove(toggleClass);
                    element.classList.add(toggleClass);
               });
          });
     });
};

toggleColorClass(".color-options", "active-color");


toggleColorClass(".option-wrapper li", "active-option");






//-------> Main code of the drawing board


const whiteboard = document.querySelector(".whiteboard");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fillColorElement = document.querySelector("#fill-color");
const clearButton = document.querySelector(".clear-btn");
const saveImageButton = document.querySelector(".save-image");

// Global variables
previousMouseX = "";
previousMouseY = "";
snapshot = "";
brushWidth = 10;
selectedTool = "brush";
let brushColor = "black"
let isDraw = false;

document.addEventListener("DOMContentLoaded", () => {
     // set the width of the canvas
     canvas.width = whiteboard.offsetWidth;
     canvas.height = whiteboard.offsetHeight;
     ctx.strokeStyle = brushColor;
});




// drawRectangle function
const drawRectangle = (e) => {
     ctx.beginPath();
     if (fillColorElement.checked) {
          ctx.fillStyle = brushColor;
          ctx.fill();

          return ctx.fillRect(e.offsetX, e.offsetY, previousMouseX - e.offsetX, previousMouseY - e.offsetY);

     } else {
          ctx.stroke();
     }
     ctx.strokeRect(e.offsetX, e.offsetY, previousMouseX - e.offsetX, previousMouseY - e.offsetY);

};

// drawCircle function
const drawCircle = (e) => {
     ctx.beginPath();
     let radius = Math.sqrt((Math.pow(previousMouseX - e.offsetX), 2) + Math.pow((previousMouseY - e.offsetY), 2));
     ctx.arc(previousMouseX, previousMouseY, radius, 0, 2 * Math.PI);

     if (fillColorElement.checked) {
          ctx.fillStyle = brushColor;
          ctx.fill();
     } else {
          ctx.stroke();
     }
};

// drawLine function
const drawLine = (e) => {
     ctx.beginPath();
     ctx.moveTo(previousMouseX, previousMouseY,);
     ctx.lineTo(e.offsetX, e.offsetY);
     ctx.stroke();
};


// drawTriangle function
const drawTriangle = (e) => {
     ctx.beginPath();
     ctx.moveTo(previousMouseX, previousMouseY,);
     ctx.lineTo(e.offsetX, e.offsetY);
     ctx.lineTo(previousMouseX * 2 - e.offsetX, e.offsetY);
     ctx.closePath();
     ctx.stroke();

     if (fillColorElement.checked) {
          ctx.fillStyle = brushColor;
          ctx.fill();
     } else {
          ctx.stroke();
     }
};

// drawing function 
const drawing = (e) => {
     if (!isDraw) return;
     ctx.putImageData(snapshot, 0, 0);

     if (selectedTool == "brush" || selectedTool == "eraser") {
          ctx.strokeStyle = selectedTool === "eraser" ? "#ffffff" : brushColor;
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
     } else if (selectedTool == "rectangle") {
          drawRectangle(e);
     }
     else if (selectedTool == "circle") {
          drawCircle(e);
     }

     else if (selectedTool == "line") {
          drawLine(e);
     }
     else if (selectedTool == "triangle") {
          drawTriangle(e);
     }
};



//------> changePenColor function
const changePenColor = () => {
     const colorItems = document.querySelectorAll(".color-options")
     colorItems.forEach((element) => {
          element.addEventListener('click', () => {
               brushColor = getComputedStyle(element).backgroundColor;
               ctx.strokeStyle = brushColor; // changing the brush color 
          })
     })
};
changePenColor();

// startDraw function 
const startDraw = (e) => {
     isDraw = true;
     previousMouseX = e.offsetX;
     previousMouseY = e.offsetY;
     ctx.beginPath();
     ctx.lineWidth = brushWidth;
     snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};





//---> clearig the canvas
clearButton.addEventListener("click", () => {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// dowloading the image
saveImageButton.addEventListener("click", () => {
     const dataUrl = canvas.toDataURL('image/png');
     const link = document.createElement('a');
     link.href = dataUrl;
     link.download = 'drawing.png';
     link.click();
});


canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);


// if the mouse is leaved from canvas 
canvas.addEventListener("mouseup", () => {
     isDraw = false;
});



// setTools function
const setTools = () => {
     // brushFontsize function
     const brushFontsize = () => {
          const brushElement = document.querySelector("#brush-size");
          brushElement.addEventListener("change", () => {
               const brushWidthValue = brushElement.value;
               brushWidth = brushWidthValue;
          });
     };

     brushFontsize();


     // Iterating on each tools and setting click eventListener
     const toolsElement = document.querySelectorAll(".tools");
     toolsElement.forEach((itm) => {
          itm.addEventListener("click", () => {
               selectedTool = itm.id;
               console.log(itm.id);
          });
     });
};

setTools();








