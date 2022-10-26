import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PostEdit } from './pages/PostEdit'
import { PostCreate } from './pages/PostCreate'
import { Routes, Route } from 'react-router-dom'
import { PostDetails } from './pages/PostDetails'
import { DefaultLayout } from './layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}  >
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postcreate" element={<PostCreate />} />
        <Route path="/postdetails/:id_post" element={<PostDetails />} />
        <Route path="/postedit/:id_post" element={<PostEdit />} />
        <Route path="*" element={<h1>Pagina não encontrada ou em Manutenção!!!</h1>} />
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