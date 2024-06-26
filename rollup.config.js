import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' with { type: "json" };

export default {
	input: 'src/index.ts',
	output: [
    {
      format: 'esm',
      file: pkg.module,
      sourcemap: false,
    }, {
      format: 'cjs',
      file: pkg.main,
      sourcemap: false,
      esModule: false,
    }, {
      name: pkg['umd:name'] || pkg.name,
      format: 'umd',
      file: pkg.unpkg,
      sourcemap: false,
      esModule: false,
      plugins: [
        terser()
      ]
    }
  ],
	external: [
		...builtinModules,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		resolve(),
		typescript()
	]
}
