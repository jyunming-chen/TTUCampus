import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commentjs from 'rollup-plugin-commonjs';

export default {
  format: 'iife',
  entry: 'src/client/index.js',
  dest: 'dist/bundle.js',
  plugins: [
    commentjs(),
    resolve(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [['env', { modules: false }]],
      plugins: ['transform-runtime'],
      babelrc: false,
    }),
  ],
  external: process.env.DEVELOPMENT
    ? ['jquery', 'three', 'bootstrap']
    : undefined,
  globals: process.env.DEVELOPMENT
    ? {
        jquery: 'jQuery',
        three: 'THREE',
      }
    : undefined,
};
