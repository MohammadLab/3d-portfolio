import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { AboutCard } from './AboutCard';
import { TypingEffect } from './typingEffect';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.querySelector('#app').appendChild(renderer.domElement);

// Load textures for floor
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('textures/wood_floor.jpg', (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.encoding = THREE.sRGBEncoding;
});

const grassTexture = textureLoader.load('/textures/pixel_grass.jpg', (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.encoding = THREE.sRGBEncoding;
});

// Create central wooden floor
const woodFloorGeometry = new THREE.PlaneGeometry(15, 15);
const woodFloorMaterial = new THREE.MeshStandardMaterial({ 
  map: woodTexture,
  roughness: 0.8,
  metalness: 0.2
});
const woodFloor = new THREE.Mesh(woodFloorGeometry, woodFloorMaterial);
woodFloor.rotation.x = -Math.PI / 2;
woodFloor.position.y = -0.1;
woodFloor.receiveShadow = true;
scene.add(woodFloor);

// Create first layer of grass squares (8 squares)
const grassFloorGeometry = new THREE.PlaneGeometry(15, 15);
const grassFloorMaterial = new THREE.MeshStandardMaterial({ 
  map: grassTexture,
  roughness: 1.0,
  metalness: 0.0
});

// First layer positions
const firstLayerPositions = [
  { x: -15, z: -15 }, { x: 0, z: -15 }, { x: 15, z: -15 },
  { x: -15, z: 0 }, { x: 15, z: 0 },
  { x: -15, z: 15 }, { x: 0, z: 15 }, { x: 15, z: 15 }
];

firstLayerPositions.forEach(pos => {
  const grassSquare = new THREE.Mesh(grassFloorGeometry, grassFloorMaterial.clone());
  grassSquare.rotation.x = -Math.PI / 2;
  grassSquare.position.set(pos.x, -0.1, pos.z);
  grassSquare.receiveShadow = true;
  scene.add(grassSquare);
});

// Second layer positions (16 squares)
const secondLayerPositions = [
  { x: -30, z: -30 }, { x: -15, z: -30 }, { x: 0, z: -30 }, { x: 15, z: -30 }, { x: 30, z: -30 },
  { x: -30, z: -15 }, { x: 30, z: -15 },
  { x: -30, z: 0 }, { x: 30, z: 0 },
  { x: -30, z: 15 }, { x: 30, z: 15 },
  { x: -30, z: 30 }, { x: -15, z: 30 }, { x: 0, z: 30 }, { x: 15, z: 30 }, { x: 30, z: 30 }
];

// Third layer positions (24 squares)
const thirdLayerPositions = [
  { x: -45, z: -45 }, { x: -30, z: -45 }, { x: -15, z: -45 }, { x: 0, z: -45 }, { x: 15, z: -45 }, { x: 30, z: -45 }, { x: 45, z: -45 },
  { x: -45, z: -30 }, { x: 45, z: -30 },
  { x: -45, z: -15 }, { x: 45, z: -15 },
  { x: -45, z: 0 }, { x: 45, z: 0 },
  { x: -45, z: 15 }, { x: 45, z: 15 },
  { x: -45, z: 30 }, { x: 45, z: 30 },
  { x: -45, z: 45 }, { x: -30, z: 45 }, { x: -15, z: 45 }, { x: 0, z: 45 }, { x: 15, z: 45 }, { x: 30, z: 45 }, { x: 45, z: 45 }
];

secondLayerPositions.forEach(pos => {
  const grassSquare = new THREE.Mesh(grassFloorGeometry, grassFloorMaterial.clone());
  grassSquare.rotation.x = -Math.PI / 2;
  grassSquare.position.set(pos.x, -0.1, pos.z);
  grassSquare.receiveShadow = true;
  scene.add(grassSquare);
});

// Add third layer of grass squares
thirdLayerPositions.forEach(pos => {
  const grassSquare = new THREE.Mesh(grassFloorGeometry, grassFloorMaterial.clone());
  grassSquare.rotation.x = -Math.PI / 2;
  grassSquare.position.set(pos.x, -0.1, pos.z);
  grassSquare.receiveShadow = true;
  scene.add(grassSquare);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
scene.add(hemisphereLight);

// Add point lights for better model visibility
const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
pointLight1.position.set(-2, 4, -2);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1.5);
pointLight2.position.set(2, 4, 2);
scene.add(pointLight2);

// Add specific lighting for contact section
const contactLight1 = new THREE.PointLight(0xffffff, 2.0);
contactLight1.position.set(0, 13, 20);
scene.add(contactLight1);

const contactLight2 = new THREE.PointLight(0xffffff, 1.5);
contactLight2.position.set(-3, 13, 23);
scene.add(contactLight2);

const contactLight3 = new THREE.PointLight(0xffffff, 1.5);
contactLight3.position.set(3, 13, 23);
scene.add(contactLight3);

// Camera constraints
const CAMERA_BOUNDS = {
  MIN_Y: 2,
  MAX_Y: 20,
  SCROLL_SPEED: 0.01
};

// Track current section
let currentSection = 'home';

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enableZoom = false;
controls.enablePan = false;
controls.enableRotate = true; // Initially enabled
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE
};

// Initial camera position
camera.position.set(15, 9, 15);
controls.target.set(0, 0, 0);

// Scroll handling
let isGreetingInProgress = true; // Flag to control scroll effect during greeting animation

// Hello Text Animation
const helloTexts = ['Hello', 'Bonjour', 'Hola', '你好', 'こんにちは', 'Ciao', 'Olá', 'Привет', 'مرحبا', 'Hello'];
let currentTextIndex = 0;
const helloElement = document.querySelector('#hello-text');

function animateHelloText() {
  // Initial fade in of "Hello"
  gsap.to(helloElement, {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      // Wait 1.5 seconds with "Hello"
      setTimeout(() => {
        // Calculate delay for remaining languages (2000ms total / remaining items)
        const remainingLanguages = helloTexts.length - 1;
        const delayPerLanguage = 2000 / remainingLanguages;

        // Start cycling through other languages
        for (let i = 1; i < helloTexts.length; i++) {
          setTimeout(() => {
            helloElement.textContent = helloTexts[i];

            // If it's the last language, trigger the camera pan transition
            if (i === helloTexts.length - 1) {
              setTimeout(() => {
                // Start camera pan animation - zoom in closer to desk
                gsap.to(camera.position, {
                  x: 3,
                  y: 2.5,
                  z: 3,
                  duration: 2.5,
                  ease: "power2.inOut"
                });

                gsap.to(controls.target, {
                  x: 0,
                  y: 0.5,
                  z: 0,
                  duration: 2.5,
                  ease: "power2.inOut"
                });

                // After greeting ends, allow scroll wheel effect
                isGreetingInProgress = false;

                // Animate hello text downward and fade out
                gsap.to('#hello-text', {
                  y: 200,
                  opacity: 0,
                  duration: 1.5,
                  ease: "power2.in"
                });

                // Fade out loading screen slightly delayed
                gsap.to('#loading-screen', {
                  opacity: 0,
                  duration: 1,
                  delay: 1,
                  ease: "power2.in",
                  onComplete: () => {
                    document.querySelector('#loading-screen').style.display = 'none';
                  }
                });
              }, 100);
            }
          }, delayPerLanguage * (i - 1));
        }
      }, 1500);
    }
  });
}

// Start hello animation
helloElement.textContent = helloTexts[0];
animateHelloText();

// Camera positions for different sections
const cameraPositions = {
  home: { 
    pos: new THREE.Vector3(3, 2.5, 3), // New position closer to the ground and better angle
    target: new THREE.Vector3(0, 0.5, 0) // Target the desk
  },
  about: {
    pos: new THREE.Vector3(-13, 10, 0),  // Camera position unchanged
    target: new THREE.Vector3(-45, 10, 0), // Looking at card's center
    cardRotation: Math.PI / 2 // 90 degrees to face center
  },
  'unreal-projects': {
    pos: new THREE.Vector3(0, 9.5, -19), // Centered position
    target: new THREE.Vector3(0, 9.5, -25) // Looking at center of tiles
  },
  projects: { 
    pos: new THREE.Vector3(19, 9.5, 0),     // Camera at same height as tiles
    target: new THREE.Vector3(25, 9.5, 0)    // Looking straight at tiles
  },
  contact: { 
    pos: new THREE.Vector3(0, 11, 17),
    target: new THREE.Vector3(0, 11, 25)
  }
};

// Navigation logic
document.querySelectorAll('nav button').forEach(button => {
  button.addEventListener('click', () => {
    const section = button.dataset.section;
    currentSection = section;
    const newPos = cameraPositions[section];

    // Enable rotation only in Home section
    controls.enableRotate = section === 'home'; // Allow free rotation only in Home section
    controls.enableZoom = section === 'home';   // Enable zooming only in Home section
    controls.enablePan = section === 'home';    // Enable panning only in Home section

    // Toggle header visibility with transform
    const header = document.getElementById('name-header');
    if (section === 'home') {
      header.style.opacity = '1';
      header.style.transform = 'translateX(-50%) translateY(0)';
      header.style.pointerEvents = 'auto';
    } else {
      header.style.opacity = '0';
      header.style.transform = 'translateX(-50%) translateY(-20px)';
      header.style.pointerEvents = 'none';
    }

    // Disable tile interactions when not in the designated section
    let interactiveTiles = [];
    if (section === 'unreal-projects') {
      interactiveTiles = unrealTiles;
    } else if (section === 'projects') {
      interactiveTiles = projectTiles;
    }

    // Enable/disable tile interaction based on section
    [...unrealTiles, ...projectTiles].forEach(tile => {
      tile.mesh.material.transparent = !interactiveTiles.includes(tile);
      tile.mesh.material.opacity = interactiveTiles.includes(tile) ? 1 : 0.3;  // Make non-interactive tiles appear "disabled"
    });

    // Hide description and escape button if they're visible
    document.getElementById('project-description').classList.remove('visible');
    document.getElementById('escape-button')?.remove();

    // If clicking projects button and there's a selected tile, reset the view and camera simultaneously
    if (section === 'projects' && selectedTile) {
      if (selectedTile) {
        selectedTile.deselect();
        selectedTile = null;
      }

      // Restore all tiles
      [...projectTiles, ...unrealTiles].forEach(tile => {
        // Restore original position
        gsap.to(tile.mesh.position, {
          x: tile.project.position.x,
          y: tile.project.position.y,
          z: tile.project.position.z,
          duration: 2,
          ease: 'power2.inOut'
        });
        tile.setOpacity(1);
      });
    }

    // Always move camera for any section
    isCameraMoving = true;
    controls.enabled = false;

    gsap.to(camera.position, {
      x: newPos.pos.x,
      y: newPos.pos.y,
      z: newPos.pos.z,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        isCameraMoving = false;
        controls.enabled = section === 'home';
      }
    });

    gsap.to(controls.target, {
      x: newPos.target.x,
      y: newPos.target.y,
      z: newPos.target.z,
      duration: 2,
      ease: 'power2.inOut'
    });
  });
});


import { ProjectTile } from './ProjectTile';
import { projects } from './projectData';
import { unrealProjects } from './unrealProjectData';

// Project tiles management
let projectTiles = [];
let unrealTiles = [];
let selectedTile = null;

const createProjectTiles = () => {
  // Layout tiles side by side
  const spacing = 5;
  const startX = 25;
  const startZ = -5;

  projects.forEach((project, index) => {
    // Calculate position
    const x = startX;
    const y = 10;  // Fixed height for all tiles
    const z = startZ + (index * spacing); // Spread along Z axis

    // Create and position tile
    const tile = new ProjectTile(project, scene);
    tile.mesh.position.set(x, y, z);
    tile.mesh.rotation.y = -Math.PI / 2; // Face -90 degrees (to the left)

    // Store initial position and rotation
    project.position = { x, y, z };
    project.rotation = -Math.PI / 2; // Keep facing -90 degrees

    projectTiles.push(tile);
  });

  // Animate tiles in
  projectTiles.forEach((tile, index) => {
    const delay = index * 0.2;
    gsap.from(tile.mesh.position, {
      y: tile.mesh.position.y + 10,
      opacity: 0,
      duration: 1,
      delay,
      ease: 'power2.out'
    });
  });
};

// Handle project interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Handle hover
window.addEventListener('mousemove', (event) => {
  // Skip tile interactions if camera is moving
  if (!isCameraMoving) {
    // Update normalized mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([
      ...projectTiles.map(tile => tile.mesh),
      ...unrealTiles.map(tile => tile.mesh)
    ]);

    // Apply scale effect on hover
    [...projectTiles, ...unrealTiles].forEach(tile => {
      const isHovered = intersects.length > 0 && intersects[0].object === tile.mesh;
      
      gsap.to(tile.mesh.scale, {
        x: isHovered ? 1.1 : 1,
        y: isHovered ? 1.1 : 1,
        z: isHovered ? 1.1 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }
});


// Handle click
window.addEventListener('click', (event) => {
  if (isCameraMoving) return; // Ignore input while camera is moving

  // Handle contact section clicks
  if (currentSection === 'contact') {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      // Find the top level model by traversing up from the intersected object
      let targetObject = intersects[0].object;
      while (targetObject.parent && targetObject.parent !== scene) {
        targetObject = targetObject.parent;
      }
      
      if (targetObject.userData.url) {
        window.open(targetObject.userData.url, '_blank');
      }
    }
    return;
  }

  // Only allow interaction in the appropriate sections
  if (currentSection !== 'projects' && currentSection !== 'unreal-projects') {
    return; // Don't interact with tiles if we're not in the correct sections
  }

  // Update mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set raycaster to camera and get intersections
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([
    ...projectTiles.map(tile => tile.mesh),
    ...unrealTiles.map(tile => tile.mesh)
  ]);

  // If something was clicked, check if it intersects with a tile
  if (intersects.length > 0) {
    const clickedTile = [...projectTiles, ...unrealTiles].find(
      tile => tile.mesh === intersects[0].object
    );

    if (clickedTile) {
      // If a tile is already selected or clicking the same tile, do nothing
      if (selectedTile) {
        return;
      }

      // Select tile
      selectedTile = clickedTile;
      clickedTile.select();

      // Perform tile-related actions (zoom in, show project description, etc.)
      const targetPos = clickedTile.mesh.position;

      // Update view state based on tile type
      viewState = unrealTiles.includes(clickedTile) ? 'unreal-zoomed' : 'project-zoomed';

      // Calculate camera position based on tile type
      let cameraOffset;
      if (unrealTiles.includes(clickedTile)) {
        // For Unreal tiles, position camera in front
        cameraOffset = {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z + 4 // Move camera back by 4 units
        };
      } else {
        // For regular project tiles, position camera to the left
        cameraOffset = {
          x: targetPos.x - 4, // Move camera left by 4 units
          y: targetPos.y,
          z: targetPos.z
        };
      }

      // Smoother camera movement towards the selected tile
      isCameraMoving = true;
      controls.enabled = false;
      gsap.to(camera.position, {
        x: cameraOffset.x,
        y: cameraOffset.y,
        z: cameraOffset.z,
        duration: 1.5,
        ease: "power2.inOut",
        force3D: true,
        overwrite: true,
        onUpdate: function() {
          camera.updateProjectionMatrix();
        },
        onComplete: function() {
          isCameraMoving = false;
          controls.enabled = false; // Keep controls disabled when zoomed into a tile
        }
      });

      // Update controls target to look directly at the tile
      gsap.to(controls.target, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function() {
          controls.update();
        }
      });

      // Optionally, show a description or perform other actions
      const descriptionEl = document.getElementById('project-description');
      descriptionEl.innerHTML = `
        <h2>${clickedTile.project.name}</h2>
        <p>${clickedTile.project.description}</p>

        <h3>Languages and Technologies Used:</h3>
        <ul>
          ${clickedTile.project.technologies.map(tech => `<li>${tech}</li>`).join('')}
        </ul>

        <h3>Key Features:</h3>
        <ul>
          ${clickedTile.project.features ? clickedTile.project.features.map(feature => `<li>${feature}</li>`).join('') : ''}
        </ul>

        <h3>What I Learned:</h3>
        <p>${clickedTile.project.learnings || ''}</p>
      `;
      descriptionEl.classList.add('visible');
    }
  }
});


// Function to reset project view
const resetProjectView = () => {
  if (selectedTile) {
    selectedTile.deselect();
    selectedTile = null;
  }

  // Restore all tiles
  [...projectTiles, ...unrealTiles].forEach(tile => {
    // Restore original position
    gsap.to(tile.mesh.position, {
      x: tile.project.position.x,
      y: tile.project.position.y,
      z: tile.project.position.z,
      duration: 1,
      ease: "power2.out"
    });
    tile.setOpacity(1);
  });

  // Reset camera
  const newPos = cameraPositions.projects;
  targetCameraY = newPos.pos.y;
  
  gsap.to(camera.position, {
    x: newPos.pos.x,
    z: newPos.pos.z,
    duration: 1.5,
    ease: 'power2.inOut'
  });
  
  gsap.to(controls.target, {
    x: newPos.target.x,
    y: newPos.target.y,
    z: newPos.target.z,
    duration: 1.5,
    ease: 'power2.inOut'
  });
};

// Create About card
const aboutCard = new AboutCard(scene);


// Track view state and camera movement
let viewState = 'normal'; // 'normal', 'unreal-zoomed', 'unreal-grid'
let isCameraMoving = false;

// Handle ESC key to reset view
window.addEventListener('keydown', (event) => {
  if (isCameraMoving) return; // Ignore input while camera is moving
  if (event.key === 'Escape') {
    const escapeButton = document.getElementById('escape-button');
    if (escapeButton) {
      escapeButton.remove();
    }

    // Only handle ESC for project tiles
    // Create a single timeline for all animations
    const timeline = gsap.timeline({
      onStart: () => {
        isCameraMoving = true;
        controls.enabled = false;
      },
      onComplete: () => {
        isCameraMoving = false;
        controls.enabled = true;
      }
    });

    if (currentSection === 'unreal-projects') {
      viewState = 'unreal-grid';
      document.getElementById('project-description').classList.remove('visible');
      if (selectedTile) {
        selectedTile.deselect();
        selectedTile = null;
      }

      const newPos = cameraPositions['unreal-projects'];
      
      // Add all animations to the timeline
      timeline
        .to(camera.position, {
          x: newPos.pos.x,
          y: newPos.pos.y,
          z: newPos.pos.z,
          duration: 1.5,
          ease: 'power2.inOut'
        }, 0)
        .to(controls.target, {
          x: newPos.target.x,
          y: newPos.target.y,
          z: newPos.target.z,
          duration: 1.5,
          ease: 'power2.inOut'
        }, 0);

      // Add all tile animations simultaneously
      unrealTiles.forEach(tile => {
        timeline.to(tile.mesh.position, {
          x: tile.project.position.x,
          y: tile.project.position.y,
          z: tile.project.position.z,
          duration: 1,
          ease: "power2.out"
        }, 0);
        tile.setOpacity(1);
      });

    } else if (currentSection === 'projects' && selectedTile) {
      document.getElementById('project-description').classList.remove('visible');
      selectedTile.deselect();
      selectedTile = null;

      const newPos = cameraPositions['projects'];
      
      // Add all animations to the timeline
      timeline
        .to(camera.position, {
          x: newPos.pos.x,
          y: newPos.pos.y,
          z: newPos.pos.z,
          duration: 1.5,
          ease: 'power2.inOut'
        }, 0)
        .to(controls.target, {
          x: newPos.target.x,
          y: newPos.target.y,
          z: newPos.target.z,
          duration: 1.5,
          ease: 'power2.inOut'
        }, 0);

      // Add all tile animations simultaneously
      [...projectTiles, ...unrealTiles].forEach(tile => {
        timeline.to(tile.mesh.position, {
          x: tile.project.position.x,
          y: tile.project.position.y,
          z: tile.project.position.z,
          duration: 1,
          ease: "power2.out"
        }, 0);
        tile.setOpacity(1);
      });
    }
  }
});



// Create Unreal project tiles
const createUnrealTiles = () => {
  // Define the spacing between tiles
  const spacing = 3;
  
  // Define the starting position for the grid
  const centerX = 0;  // Horizontal center position for the grid
  const centerZ = -25;   // Depth center position for the grid
  
  // Y positions for the top and bottom rows
  const topRowY = 12;   // Y position for the top row
  const bottomRowY = 10 - spacing; // Y position for the bottom row (lower than the top row)

  unrealProjects.forEach((project, index) => {
    // Calculate the x and y positions for each tile
    const x = centerX + (index % 2 === 0 ? -spacing : spacing);  // Even index (0, 2) left, odd (1, 3) right
    const y = index < 2 ? topRowY : bottomRowY; // Top row for index 0-1, bottom row for index 2-3
    const z = centerZ;  // Keep Z constant for all tiles

    // Create and position the tile
    const tile = new ProjectTile(project, scene);
    tile.mesh.position.set(x, y, z);
    tile.mesh.rotation.y = 0; // Face forward for Unreal tiles

    // Store the initial position and rotation for each project
    project.position = { x, y, z };
    project.rotation = 0;

    unrealTiles.push(tile);
  });

  // Animate tiles in with some delay
  unrealTiles.forEach((tile, index) => {
    const delay = index * 0.2;
    gsap.from(tile.mesh.position, {
      y: tile.mesh.position.y + 10,
      opacity: 0,
      duration: 1,
      delay,
      ease: 'power2.out'
    });
  });
};


// Model loading
const loadModels = () => {
  console.log('=== Starting Models Load Process ===');
  
  const loader = new GLTFLoader();
  
  // Load contact section models
  const contactModels = [
    {
      path: '/models/3d_linkedin_logo.glb',
      position: new THREE.Vector3(-2.5, 9.5, 25),
      url: 'https://www.linkedin.com/in/mohammad-labak/',
      scale: 0.5
    },
    {
      path: '/models/3d_github_logo.glb',
      position: new THREE.Vector3(0, 9.5, 25),
      url: 'https://github.com/MohammadLab',
      scale: 0.5
    },
    {
      path: '/models/email_icon.glb',
      position: new THREE.Vector3(2.5, 9.5, 25),
      url: 'mailto:moe.labak@gmail.com',
      scale: 0.5
    }
  ];

  // Load each contact model
  contactModels.forEach(modelInfo => {
    loader.load(
      modelInfo.path,
      (gltf) => {
        const model = gltf.scene;
        model.position.copy(modelInfo.position);
        model.scale.setScalar(modelInfo.scale);
        model.rotation.y = Math.PI; // Rotate 180 degrees around Y axis
        
        // Add custom property to store URL
        model.userData.url = modelInfo.url;
        
        // Make model interactive
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.side = THREE.DoubleSide;
            node.material.needsUpdate = true;
          }
        });

        // Add hover animation
        let isHovered = false;
        
        window.addEventListener('mousemove', (event) => {
          if (currentSection === 'contact') {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(model, true);
            
            if (intersects.length > 0 && !isHovered) {
              isHovered = true;
              gsap.to(model.scale, {
                x: modelInfo.scale * 1.2,
                y: modelInfo.scale * 1.2,
                z: modelInfo.scale * 1.2,
                duration: 0.3,
                ease: 'power2.out'
              });
            } else if (intersects.length === 0 && isHovered) {
              isHovered = false;
              gsap.to(model.scale, {
                x: modelInfo.scale,
                y: modelInfo.scale,
                z: modelInfo.scale,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          }
        });
        
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading contact model:', error);
      }
    );
  });

  console.log('Loading desk model...');
  loader.load(
    '/models/desk.glb',
    (gltf) => {
      console.log('Model loaded successfully:', gltf);
      
      const model = gltf.scene;
      
      // Reset transformation and scale down (10x * 3x smaller)
      model.position.set(0, -0.1, 0); // Place directly on floor
      model.rotation.set(0, 0, 0);
      model.scale.set(0.033, 0.033, 0.033);
      
      // Setup materials and shadows
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.side = THREE.DoubleSide;
            node.material.needsUpdate = true;
          }
        }
      });
      
      scene.add(model);
      console.log('Model added to scene');
      
      // Debug info
      console.log({
        position: model.position,
        rotation: model.rotation,
        scale: model.scale,
        children: model.children.length,
        animations: gltf.animations.length
      });
    },
    (xhr) => {
      const percent = (xhr.loaded / xhr.total * 100);
      console.log(`Loading progress: ${percent.toFixed(1)}%`);
    },
    (error) => {
      console.error('Model loading error:', error);
    }
  );

};

// Start loading
loadModels();
createProjectTiles();
createUnrealTiles();

// Initialize typing effect
const typingEffect = new TypingEffect();
typingEffect.start();


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  
  const time = performance.now() * 0.001;
  
  // Update about card
  if (currentSection === 'about') {
    aboutCard.update(time);
  }
  
  renderer.render(scene, camera);
}
animate();

// Window resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
