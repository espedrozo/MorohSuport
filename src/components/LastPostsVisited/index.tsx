import { Container } from "./styles";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";

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

    let response = localStorage.getItem('@moroh-suport-v1.0.1:postRecentes');
    resultOfListOfLocalStorage = response !== null ? (JSON.parse(response)) : [];

    resultOfListOfLocalStorage?.reverse();
    setListaPosts(resultOfListOfLocalStorage?.slice(0, 5));
  }, [reloadContextPostsVisited]);

  return (
    <Container>
      {listaPosts &&
        listaPosts.map((post) =>
          <NavLink key={post.id_post} to={`/postdetails/${post.id_post}`} className="lista">
            {
              post.titulo?.length > 80 ?
                post.titulo?.substring(0, 80).toLocaleUpperCase() + "..."
                : post.titulo?.toUpperCase()
            }
          </NavLink>
        )
      }
    </Container>
  )
}