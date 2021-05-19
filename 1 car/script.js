const scene = new THREE.Scene();

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);

//camera
const aspect = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspect;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2,
  cameraWidth / 2,
  cameraHeight / 2,
  cameraHeight / -2,
  0,
  1000
); //75, 75, 75, 75

camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);

//Wheels
function createWheels() {
  const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });

  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}

//Car mirror
function carSideWindow() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

  function carFrontWindow() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

function createCar() {
  const car = new THREE.Group();

  const backWheel = createWheels();
  backWheel.position.y = 6;
  backWheel.position.x = -18;
  car.add(backWheel);

  const frontWheel = createWheels();
  frontWheel.position.y = 6;
  frontWheel.position.x = 18;
  car.add(frontWheel);

  const mainBody = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0x78b14b })
  );

  mainBody.position.y = 12;
  car.add(mainBody);

  const carFront = carFrontWindow();
  const carLeftSide = carFrontWindow();
  const carRightSide = carSideWindow();
  const carBack = carSideWindow();

//   carLeftSide.center = new THREE.Vector2(0.5, 0.5);
//   carLeftSide.rotation = Math.PI;
//   carLeftSide.flipY = false;

  const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
    new THREE.MeshLambertMaterial({ map: carFront }),
    new THREE.MeshLambertMaterial({ map: carBack }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
    new THREE.MeshLambertMaterial({ map: carRightSide }),
    new THREE.MeshLambertMaterial({ map: carLeftSide }),
  ]);

  cabin.position.x = -6;
  cabin.position.y = 25.5;
  car.add(cabin);

  return car;
}

const car = createCar();
scene.add(car);



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);
