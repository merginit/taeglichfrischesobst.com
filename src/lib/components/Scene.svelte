<script lang="ts">
	import { AmbientLight, OrbitControls, PerspectiveCamera } from '@threlte/core';
	import { Environment, GLTF } from '@threlte/extras';

	const model_base_path = '/assets/models/';
</script>

<PerspectiveCamera position={{ x: 5, y: 2, z: 5 }} fov={25}>
	<OrbitControls autoRotate enableDamping enableZoom={false} />
</PerspectiveCamera>

<AmbientLight />

<GLTF
	castShadow
	receiveShadow
	url={`${model_base_path}lemon/lemon.gltf`}
	scale={35}
	position={{ y: 0 }}
	rotation={{
		x: Math.random() * Math.PI * 2,
		y: Math.random() * Math.PI * 2,
		z: 0
	}}
/>
