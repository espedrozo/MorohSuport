import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Li } from "./styles";
import { api } from '../../lib/Api'
import Cookies from "js-cookie";
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";

type SubProps = {
  id: string;
  tipo: string;
  descricao: string;
  lk_categoria: string;
}

type SubcategoriaProps = {
  id_pai: string;
  id: string;
  tipo: string;
  descricao: string
  lk_categoria: string;
  sub?: SubProps[];
}

type Category = {
  id: string;
  descricao: string;
  id_pai: string;
  tipo: string;
  subcategoria?: SubcategoriaProps[]
}

/* 
type IdCategoria = {
  find(arg0: (element: number) => boolean);
  push(idCat: number): void;
  array: number
}

type GetCategoriesResponse = {
  data: Category[];
}; */

var listOfIdOfCategories: any = JSON.parse(sessionStorage.getItem('listOfIdOfCategories')) || [];


export function CategoriesList() {

  const [listOfCategories, setListOfCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getAllCategoires() {

      const categories = await api.getAllCategories()

      //console.log(categories)

      if (sessionStorage.getItem('allCategories') === null) {
        sessionStorage.setItem('allCategories', JSON.stringify(categories));
        setListOfCategories(JSON.parse(sessionStorage.getItem('allCategories')))
      } else {
        setListOfCategories(JSON.parse(sessionStorage.getItem('allCategories')))
      }
    }
    getAllCategoires();
  }, []);

  // Monitorando o ID das categorias, subcategorias e subs.
  const CarregarCategorias = (id: string, event: any) => {

    const idCat = Number(id);

    event.stopPropagation();

    document.querySelector('.has-children');
    event.target.classList.toggle('open');

    if (typeof (idCat) == 'number') {

      // Faz a busca do idCat, dentro da lista idCategorias se não encontrar o retorno é undefined
      const idEncontrado = listOfIdOfCategories.find((element: number) => element === idCat);

      if (!idEncontrado && idCat !== 0) {

        listOfIdOfCategories.push(idCat)

        // Salvando a Lista de IDs no sessionStorage
        sessionStorage.setItem('listOfIdOfCategories', JSON.stringify(listOfIdOfCategories));
        listOfIdOfCategories = JSON.parse(sessionStorage.getItem('listOfIdOfCategories'));

        const subCategory = async (idCat: number) => {
          const response = await api.getAllSubCategories(String(idCat));

          let newCat = [...listOfCategories];

          newCat.forEach(cat => {

            if (cat.subcategoria) {
              cat.subcategoria.forEach((elementoSub: SubcategoriaProps) => {
                if (elementoSub['id'] === String(idCat) && elementoSub['tipo'] == "0") {
                  elementoSub.sub = response
                }
              });
            } else if (cat['id'] === String(idCat) && cat['tipo'] == "0") {
              cat.subcategoria = response
            }
          });

          if (sessionStorage.getItem('allCategories') !== null) {
            sessionStorage.setItem('allCategories', JSON.stringify(newCat));
          }
          setListOfCategories(newCat);
        }
        subCategory(idCat);
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
              onClick={(event) => CarregarCategorias(category.id, event)}
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
                        onClick={(event) => CarregarCategorias(subcategory.id, event)}
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