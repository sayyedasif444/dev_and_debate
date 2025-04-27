import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function CreativeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const codeRef = useRef<THREE.Group>(null);
  const chessRef = useRef<THREE.Group>(null);
  const filmRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particles for the code section
  const particles = useMemo(() => {
    const temp = [];
    const count = 1000;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 5;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 5;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  // Create matrix transforms for film frames
  const filmFrames = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3(
        Math.cos(i * Math.PI / 6) * 0.8,
        Math.sin(i * Math.PI / 6) * 0.8,
        0
      );
      const rotation = new THREE.Euler(0, 0, i * Math.PI / 6);
      const scale = new THREE.Vector3(1, 1, 1);
      
      return matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);
    }), 
  []);

  // Chess pieces positions
  const chessPieces = useMemo(() => [
    { pos: new THREE.Vector3(0.4, 0, 0.4), type: 'pawn' },
    { pos: new THREE.Vector3(-0.4, 0, -0.4), type: 'knight' },
    { pos: new THREE.Vector3(0.4, 0, -0.4), type: 'queen' },
    { pos: new THREE.Vector3(-0.4, 0, 0.4), type: 'king' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // Complex rotation patterns
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;

      // Animate code section
      if (codeRef.current) {
        codeRef.current.position.y = Math.sin(time) * 0.2;
        codeRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
        codeRef.current.scale.set(
          1 + Math.sin(time * 0.5) * 0.05,
          1 + Math.sin(time * 0.5) * 0.05,
          1 + Math.sin(time * 0.5) * 0.05
        );
      }

      // Animate chess section with wave effect
      if (chessRef.current) {
        chessRef.current.children.forEach((child, i) => {
          child.position.y = Math.sin(time * 2 + i * 0.5) * 0.1;
          child.rotation.y = time * 0.5 + i * Math.PI / 4;
        });
      }

      // Animate film section with spiral effect
      if (filmRef.current) {
        filmRef.current.children.forEach((child, i) => {
          const angle = time + i * Math.PI / 6;
          child.position.x = Math.cos(angle) * (0.8 + Math.sin(time * 0.5) * 0.1);
          child.position.y = Math.sin(angle) * (0.8 + Math.sin(time * 0.5) * 0.1);
          child.rotation.z = angle + Math.PI / 2;
        });
      }

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.1;
        particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Code Section */}
      <group ref={codeRef} position={[-2, 0, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh>
            <torusKnotGeometry args={[0.4, 0.15, 128, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0}
              metalness={0.8}
              transmission={1}
              distortion={0.5}
              distortionScale={0.5}
              temporalDistortion={0.1}
              color="#4080ff"
              attenuationDistance={0.5}
              attenuationColor="#ffffff"
            />
          </mesh>
        </Float>

        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length / 3}
              array={particles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#4080ff"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.2}
          height={0.05}
          position={[-0.5, -1, 0]}
        >
          CODE
          <meshStandardMaterial
            color="#4080ff"
            emissive="#4080ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </group>

      {/* Chess Section */}
      <group ref={chessRef} position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2, 2, 16, 16]} />
          <meshStandardMaterial
            color="white"
            metalness={0.8}
            roughness={0.2}
            wireframe={true}
          />
        </mesh>

        {chessPieces.map((piece, i) => (
          <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={piece.pos}>
              <dodecahedronGeometry args={[0.2, 1]} />
              <MeshTransmissionMaterial
                backside
                samples={4}
                thickness={0.5}
                roughness={0}
                metalness={0.9}
                transmission={1}
                distortion={0.5}
                distortionScale={0.5}
                temporalDistortion={0.1}
                color="#FFD700"
                attenuationDistance={0.5}
                attenuationColor="#ffffff"
              />
            </mesh>
          </Float>
        ))}

        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.2}
          height={0.05}
          position={[-0.4, -1, 0]}
        >
          CHESS
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Text3D>
      </group>

      {/* Film Section */}
      <group ref={filmRef} position={[2, 0, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh>
            <torusGeometry args={[0.8, 0.2, 32, 64]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0}
              metalness={0.7}
              transmission={1}
              distortion={0.5}
              distortionScale={0.5}
              temporalDistortion={0.1}
              color="#E0E0E0"
              attenuationDistance={0.5}
              attenuationColor="#ffffff"
            />
          </mesh>
        </Float>

        {filmFrames.map((matrix, i) => (
          <mesh key={i} matrixAutoUpdate={false} matrix={matrix}>
            <boxGeometry args={[0.2, 0.15, 0.05]} />
            <meshStandardMaterial
              color="black"
              metalness={0.8}
              roughness={0.2}
              emissive="#202020"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}

        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.2}
          height={0.05}
          position={[-0.3, -1, 0]}
        >
          FILM
          <meshStandardMaterial
            color="#E0E0E0"
            emissive="#E0E0E0"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </Text3D>
      </group>

      {/* Enhanced Lighting */}
      <pointLight position={[2, 3, 4]} intensity={1} color="#ffffff" />
      <pointLight position={[-2, -3, -4]} intensity={0.8} color="#4080ff" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#FFD700" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      <ambientLight intensity={0.4} />
    </group>
  );
} 