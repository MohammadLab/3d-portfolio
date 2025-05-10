import * as THREE from 'three';
import { TextureLoader } from 'three';
import gsap from 'gsap';

export class ProjectTile {
  constructor(project, scene) {
    this.project = project;
    this.scene = scene;
    this.isHovered = false;
    this.isSelected = false;
    
    // Create tile geometry and materials
    this.createTile();
    
    // Add to scene
    this.scene.add(this.mesh);
  }

  createTile() {
    // Create geometry
    const geometry = new THREE.BoxGeometry(4, 3, 0.2);
    
    // Load texture for the project image
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(this.project.image);
    
    // Create materials
    this.materials = {
      front: new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.1,
        roughness: 0.3,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: texture,
        emissiveIntensity: 0.4
      }),
      side: new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.1,
        roughness: 0.3,
        emissive: new THREE.Color(0x222222),
        emissiveIntensity: 0.2
      })
    };

    // Create mesh with materials
    this.mesh = new THREE.Mesh(geometry, [
      this.materials.side,     // right
      this.materials.side,     // left
      this.materials.side,     // top
      this.materials.side,     // bottom
      this.materials.front,    // front
      this.materials.side      // back
    ]);

    // Initial rotation to face camera
    this.mesh.rotation.x = 0;

    this.mesh.userData.projectId = this.project.id;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  setPosition(x, y, z) {
    gsap.to(this.mesh.position, {
      x, y, z,
      duration: 1.5,
      ease: 'power3.out',
      force3D: true,
      overwrite: true
    });
  }

  onHover(isHovered, mouseX = 0, mouseY = 0) {
    this.isHovered = isHovered;

    // Scale effect only on hover
    gsap.to(this.mesh.scale, {
      x: isHovered ? 1.1 : 1,
      y: isHovered ? 1.1 : 1,
      z: isHovered ? 1.1 : 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Always rotate towards cursor, but stronger effect when hovered
    const intensity = isHovered ? 0.4 : 0.2;
    const rotationX = mouseY * intensity; // Removed negative sign to fix inversion
    const rotationY = mouseX * intensity;
    
    gsap.to(this.mesh.rotation, {
      x: rotationX,
      y: rotationY,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  select() {
    this.isSelected = true;
    gsap.to(this.mesh.rotation, {
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  deselect() {
    this.isSelected = false;
    gsap.to(this.mesh.rotation, {
      y: this.project.rotation || 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  setOpacity(opacity) {
    // Set opacity for all materials and their maps
    gsap.to([this.materials.front, this.materials.side], {
      opacity,
      transparent: opacity < 1,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        // Update the texture opacity along with the material
        if (this.materials.front.map) {
          this.materials.front.map.needsUpdate = true;
        }
      }
    });
  }

  dispose() {
    this.mesh.geometry.dispose();
    Object.values(this.materials).forEach(material => material.dispose());
    this.scene.remove(this.mesh);
  }
}
