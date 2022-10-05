import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layout/DefaultLayout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PostCreate } from './pages/PostCreate'
import { PostDetails } from './pages/PostDetails'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}  >
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postdetails/:id_post" element={<PostDetails />} />
        <Route path="/postcreate" element={<PostCreate />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  )
}



/* 
   <Route path="/" element={<Inicio />} />
            <Route path="/posts" element={<Post />} />
            <Route path="/detalhe/:id_post" element={<Detalhe />} />
            <Route path="/atualizar/:id_post" element={<Atualizar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/senha" element={<Senha />} />
            <Route path="/recuperarSenha/:id_usuario" element={<RecuperarSenha />} />
            <Route element={<Inicio />} />

*/