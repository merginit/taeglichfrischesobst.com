<script lang="ts">
	import { AmbientLight, OrbitControls, PerspectiveCamera } from '@threlte/core';
	import { Environment, GLTF } from '@threlte/extras';
</script>

<PerspectiveCamera position={{ x: 5, y: 2, z: 5 }} fov={25}>
	<OrbitControls autoRotate enableDamping />
</PerspectiveCamera>

<AmbientLight />

<GLTF
	castShadow
	receiveShadow
	url={'/assets/models/pineapple/pineapple.gltf'}
	scale={1}
	position={{ y: 2 }}
/>
