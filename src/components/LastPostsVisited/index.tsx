import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";
import { Container } from "./styles";

interface PostsRecentsProps {
  id_post: string;
  titulo: string;
}

export function LastPostsVisited() {

  const {
    reloadContextPostsVisited,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  const [listaPosts, setListaPosts] = useState<PostsRecentsProps[]>([]);

  var resultOfListOfLocalStorage: PostsRecentsProps[] = [];

  useEffect(() => {

    let response = localStorage.getItem('postRecentes');
    resultOfListOfLocalStorage = response !== null ? (JSON.parse(response)) : [];

    resultOfListOfLocalStorage?.reverse();
    setListaPosts(resultOfListOfLocalStorage?.slice(0, 5));
  }, [reloadContextPostsVisited]);

  return (
    <Container>
      {
        listaPosts?.map((post, k) =>
          <NavLink key={post.id_post} to={`/postdetails/${post.id_post}`} className="lista">
            {post.titulo}
          </NavLink>
        )
      }
    </Container>
  )
}