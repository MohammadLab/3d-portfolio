import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gsap from 'gsap';

export class AboutCard {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);
    
    // Create card
    const cardGeometry = new THREE.BoxGeometry(16, 15, 0.2);
    const cardMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.8,
      metalness: 0.5,
      roughness: 0.1,
    });
    this.card = new THREE.Mesh(cardGeometry, cardMaterial);
    this.group.add(this.card);

    // Add glow effect
    const glowGeometry = cardGeometry.clone();
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x666666) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float glow = sin(time * 2.0) * 0.5 + 0.5;
          float edge = 1.0 - smoothstep(0.4, 0.5, distance(vUv, vec2(0.5)));
          gl_FragColor = vec4(color, edge * glow * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.glow.scale.multiplyScalar(1.05);
    this.group.add(this.glow);

    // Load font and create text
    const loader = new FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('About Mohammad Labak', {
        font: font,
        size: 0.5,
        height: 0.1,
      });
      const textMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc,
        emissive: 0xcccccc,
        emissiveIntensity: 0.5
      });
      this.titleText = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      this.titleText.position.set(0, 6, 0.2);
      this.group.add(this.titleText);

      // Add content text
      const contentGeometry = new TextGeometry(
        'Hi, I\'m Mohammad, a second-year Computer Science student at the\n' +
        'University of Windsor, passionate about software development, AI,\n' +
        'and innovative technology. I thrive on bringing ideas to life\n' +
        'through code, whether it\'s building interactive applications,\n' +
        'optimizing systems, or exploring the intersection of gaming and AI.\n\n' +
        'I have hands-on experience in game development, web applications,\n' +
        'and IoT. I built a movement pack in Unreal Engine 5, developed\n' +
        'TA marking software, and created a logistics tracking app that\n' +
        'optimizes warehouse inventory. My recent work in Three.js\n' +
        'integrates 3D interactivity into web experiences.\n\n' +
        'Beyond projects, I\'m a Teaching Assistant for an Introduction to\n' +
        'Algorithms and Programming course, where I guide students in\n' +
        'problem-solving and efficient coding practices. My interest in\n' +
        'CAN bus and automotive technology fuels my ambition to work in\n' +
        'IoT and AI-driven smart systems.\n\n' +
        'Let\'s create something innovative! 🚀',
        {
          font: font,
          size: 0.3,
          height: 0.05,
        }
      );
      const contentMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.2
      });
      this.contentText = new THREE.Mesh(contentGeometry, contentMaterial);
      contentGeometry.center();
      this.contentText.position.set(0, 0, 0.2);
      this.group.add(this.contentText);
    });

    // Initial position and rotation
    this.group.position.set(-25, 10, 0);
    this.initialY = this.group.position.y;
    this.group.rotation.y = Math.PI / 2; // 90 degrees - facing center
    this.initialRotation = Math.PI / 2; // Store initial rotation
    this.targetRotation = Math.PI / 2; // Keep target rotation at 90 degrees
  }

  update(time) {
    if (this.glow) {
      this.glow.material.uniforms.time.value = time;
    }

    // Hover animation
    gsap.to(this.group.position, {
      y: this.initialY + Math.sin(time * 2) * 0.1,
      duration: 0.1
    });
  }

  dispose() {
    // Cleanup materials and geometries
    this.card.geometry.dispose();
    this.card.material.dispose();
    this.glow.geometry.dispose();
    this.glow.material.dispose();
    if (this.titleText) {
      this.titleText.geometry.dispose();
      this.titleText.material.dispose();
    }
    if (this.contentText) {
      this.contentText.geometry.dispose();
      this.contentText.material.dispose();
    }
    this.scene.remove(this.group);
  }
}
