import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
base: '/',
plugins: [react()],
build: {
outDir: 'dist',
assetsDir: 'static',
rollupOptions: {
output: {
entryFileNames: 'static/js/[name].[hash].chunk.js',
chunkFileNames: 'static/js/[name].[hash].chunk.js',
assetFileNames: (assetInfo) => {
const ext = path.extname(assetInfo.name || '')
if (ext === '.css') return 'static/css/[name].[hash][extname]'
return 'static/media/[name].[hash][extname]'
}
}
}
}
})