import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "./styles";

interface PostsRecentsProps {
  id_post: string;
  titulo: string;
}

export function LastPostsVisited() {
  const [listaPosts, setListaPosts] = useState<PostsRecentsProps[]>([]);

  var resultados: PostsRecentsProps[] = [];


  // tem que criar uma variavel auxxiliar pro array fazer depois
  useEffect(() => {
    resultados = (JSON.parse(localStorage.getItem('postRecentes')))
    resultados?.reverse();
    setListaPosts(resultados?.slice(0, 5));
  }, []);

  return (
    <Container>
      {
        listaPosts?.map((post) => {
          return (
            <NavLink key={post.id_post} to={`/postdetails/${post.id_post}`} className="lista">
              {post.titulo}
            </NavLink>
          );
        })
      }
    </Container>
  )
}