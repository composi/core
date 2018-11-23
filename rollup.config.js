import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/composi-core.js',
      format: 'umd',
      name: 'composi',
      sourcemap: true,
      sourcemapFile: 'dist/composi-core.js.map'
    },
    {
      file: 'dist/composi-core.mjs',
      format: 'esm',
      name: 'composi',
      sourcemap: true,
      sourcemapFile: 'dist/composi-core.mjs.map'
    }
  ],
  plugins:
    [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      minify({ 
        mangle: { topLevel: true },
        comments: false
      })
    ]
}
