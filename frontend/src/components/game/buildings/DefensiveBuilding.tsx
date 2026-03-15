import { useRef } from 'react';
import * as THREE from 'three';
import { BuildingType } from '@/backend';

interface DefensiveBuildingProps {
  type: BuildingType;
  level: number;
  constructionProgress?: number;
}

export default function DefensiveBuilding({ type, level, constructionProgress = 1 }: DefensiveBuildingProps) {
  const isCannon = type === BuildingType.cannon;
  const height = 2 + level * 0.3;
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} scale={constructionProgress}>
      {/* Stone foundation */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.2, 0.3, 8]} />
        <meshStandardMaterial
          color="#6b5d52"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1, 1, 8]} />
        <meshStandardMaterial
          color="#696969"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Main tower with stone texture */}
      <mesh position={[0, height / 2 + 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.7, height, 8]} />
        <meshStandardMaterial
          color="#808080"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Stone detail bands */}
      {[0.3, 0.6, 0.9].map((ratio, i) => (
        <mesh key={i} position={[0, height * ratio + 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.65, 0.65, 0.1, 8]} />
          <meshStandardMaterial
            color="#6b5d52"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Battlements */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map(
        (angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.65,
              height + 0.7,
              Math.sin(angle) * 0.65,
            ]}
            castShadow
          >
            <boxGeometry args={[0.2, 0.3, 0.2]} />
            <meshStandardMaterial
              color="#696969"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        )
      )}

      {/* Weapon platform */}
      <mesh position={[0, height + 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.6, 0.2, 8]} />
        <meshStandardMaterial
          color="#5a5a5a"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {isCannon ? (
        <group>
          {/* Cannon base */}
          <mesh position={[0, height + 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.3, 0.3, 8]} />
            <meshStandardMaterial
              color="#2c3e50"
              roughness={0.4}
              metalness={0.7}
            />
          </mesh>

          {/* Cannon barrel */}
          <mesh position={[0.6, height + 0.65, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.18, 1.2]} />
            <meshStandardMaterial
              color="#2c3e50"
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>

          {/* Barrel bands */}
          {[0.3, 0.6, 0.9].map((x, i) => (
            <mesh
              key={i}
              position={[x, height + 0.65, 0]}
              rotation={[0, 0, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[0.19, 0.19, 0.08]} />
              <meshStandardMaterial
                color="#1a252f"
                roughness={0.5}
                metalness={0.6}
              />
            </mesh>
          ))}

          {/* Ammunition pile */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[-0.4, height + 0.55 + i * 0.15, 0.3]}
              castShadow
            >
              <sphereGeometry args={[0.12]} />
              <meshStandardMaterial
                color="#4a4a4a"
                roughness={0.4}
                metalness={0.7}
              />
            </mesh>
          ))}
        </group>
      ) : (
        <group>
          {/* Archer platform roof */}
          <mesh position={[0, height + 1.1, 0]} castShadow>
            <coneGeometry args={[0.8, 0.8, 4]} />
            <meshStandardMaterial
              color="#8b4513"
              roughness={0.8}
              metalness={0.0}
            />
          </mesh>

          {/* Roof support posts */}
          {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.5,
                height + 0.75,
                Math.sin(angle) * 0.5,
              ]}
              castShadow
            >
              <cylinderGeometry args={[0.05, 0.05, 0.5]} />
              <meshStandardMaterial
                color="#654321"
                roughness={0.9}
                metalness={0.0}
              />
            </mesh>
          ))}

          {/* Bow */}
          <mesh position={[0.3, height + 0.65, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <torusGeometry args={[0.25, 0.03, 8, 16, Math.PI]} />
            <meshStandardMaterial
              color="#654321"
              roughness={0.8}
              metalness={0.0}
            />
          </mesh>

          {/* Arrows in quiver */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[-0.3, height + 0.7 + i * 0.1, 0.2]}
              rotation={[Math.PI / 6, 0, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <meshStandardMaterial
                color="#8b4513"
                roughness={0.7}
                metalness={0.0}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
