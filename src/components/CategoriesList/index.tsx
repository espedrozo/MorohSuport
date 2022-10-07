import { MouseEvent } from "react";
import { api } from '../../lib/Api'
import { Link } from "react-router-dom";
import { Container, Li } from "./styles";
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";

export function CategoriesList() {

  const {
    listOfCategories,
    setListOfCategories,
    listOfIdOfCategories,
    setListOfIdOfCategories
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  const LoadingAllCategories = (id: string, event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {

    const idCategory = Number(id);

    const target = event.target as Element;

    event.stopPropagation();

    document.querySelector('.has-children');
    target.classList.toggle('open');

    if (typeof (idCategory) == 'number') {

      const idEncontrado = listOfIdOfCategories.find((element) => element === idCategory);

      if (!idEncontrado && idCategory !== 0) {

        listOfIdOfCategories.push(idCategory);

        setListOfIdOfCategories(listOfIdOfCategories)

        const subCategory = async (idCategory: number) => {
          const response = await api.getAllSubCategories(String(idCategory));

          let newCategory = [...listOfCategories];

          newCategory.forEach(cat => {
            if (cat.subcategoria) {
              cat.subcategoria.forEach((elementoSubcategory) => {
                if (elementoSubcategory['id'] === String(idCategory) && elementoSubcategory['tipo'] == "0") {
                  elementoSubcategory.sub = response
                }
              });
            } else if (cat['id'] === String(idCategory) && cat['tipo'] == "0") {
              cat.subcategoria = response
            }
          });
          setListOfCategories(newCategory);
        }
        subCategory(idCategory);
      }
    }
  };

  return (
    <Container>
      <ul>
        {listOfCategories &&
          listOfCategories?.map((category) => (
            <Li key={category.id}
              value={category.id}
              onClick={(event) => LoadingAllCategories(category.id, event)}
              className={category.tipo == '0' ? "has-children" : ''}
            >
              {category.tipo === '0' && category.descricao}
              {category.tipo === '1' &&
                <Link to={`/postdetails/${category.id}`}>
                  {category.tipo === '1' && category.descricao}
                </Link>
              }
              {category.subcategoria &&
                <ul>
                  {listOfCategories &&
                    category.subcategoria?.map((subcategory, index) => (
                      <Li key={subcategory.id}
                        value={subcategory.id}
                        onClick={(event) => LoadingAllCategories(subcategory.id, event)}
                        className={subcategory.id_pai == category.id ? "has-children" : ''}
                      >
                        {subcategory.id_pai == category.id && subcategory.descricao}

                        {subcategory.tipo == '1' &&
                          <Link to={`/postdetails/${subcategory.id}`} >
                            {subcategory.tipo === '1' && subcategory.descricao}
                          </Link>
                        }
                        {category.subcategoria?.[index].sub &&
                          <ul>
                            {listOfCategories &&
                              category.subcategoria?.[index].sub?.map((subcat) => (
                                <Link key={subcat.id} to={`/postdetails/${subcat.id}`} >
                                  {subcat.descricao}
                                </Link>
                              ))
                            }
                          </ul>
                        }
                      </Li>
                    ))
                  }
                </ul>
              }
            </Li>
          ))
        }
      </ul>
    </Container>
  );
}