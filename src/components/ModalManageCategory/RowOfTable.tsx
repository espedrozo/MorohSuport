import { api } from '../../lib/Api';
import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, Fragment, useState } from 'react';
import { ClipboardText, FloppyDisk } from 'phosphor-react';
import { ModalDeleteCategory } from '../ModalDeleteCategory';
import { LinhaTableButton, LinhaTB, LinhaTR } from './styles';
import { useContextSelector } from 'use-context-selector';
import { PostesContext } from '../../contexts/PostsContext';

interface EditeCategoryProps {
  id: string;
  id_pai?: string;
  descricao: string;
  categoria_pai?: string;
}

interface SubCategoriesProps {
  id: string;
  id_pai: string;
  descricao: string;
}

interface ListaDeCategoriesProps {
  id: string;
  id_pai?: string;
  descricao: string;
  categoria_pai?: string;
  sub?: SubCategoriesProps[];
}

interface ManageCategoryModalProps {
  listaDeCategorias: ListaDeCategoriesProps[];
  listaDeCategoriasPai: ListaDeCategoriesProps[];
  handleIdCategoryDelete: (id: string) => void;
}

export function RowOfTable(
  {
    listaDeCategorias,
    listaDeCategoriasPai,
    handleIdCategoryDelete,
  }: ManageCategoryModalProps
) {

  const {
    reloadContext,
    setReloadContext,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });


  const [nenhuma] = useState('');
  const [idAtualizarCategoriaPai, setIdAtualizarCategoriaPai] = useState('');
  const [atualizarCategoria, setAtualizarCategoria] = useState<ListaDeCategoriesProps[]>([]);

  function handleEditeCategory(category: ListaDeCategoriesProps) {
    setAtualizarCategoria([category]);
  }

  const handleChangeInputEditeCategory = async (event: ChangeEvent<HTMLInputElement>) => {
    const val = [...atualizarCategoria];
    val[0].descricao = event.target.value;
  }

  async function handleSaveUpdatedOneCategory(categoryEdite: EditeCategoryProps[]) {

    const id_cat = categoryEdite[0]?.id;
    const descricao = categoryEdite[0]?.descricao;

    var id_pai = null;

    if (idAtualizarCategoriaPai === '') {
      id_pai = atualizarCategoria[0]?.id_pai

    } else if (parseInt(idAtualizarCategoriaPai)) {
      id_pai = idAtualizarCategoriaPai
    } else {
      id_pai = nenhuma
    }

    var valoresDaCategoria = null;

    valoresDaCategoria = { id_cat, descricao, id_pai }

    await api.updateCategories(id_cat, valoresDaCategoria);

    localStorage.removeItem('idRecentes');
    localStorage.removeItem('postRecentes');

    sessionStorage.removeItem('allCategories');
    sessionStorage.removeItem('listOfIdOfCategories');

    setReloadContext(!reloadContext);

  }

  return (
    <Fragment>
      {
        listaDeCategorias?.map((categoria) => (
          <Fragment key={categoria.id}>
            <LinhaTR>
              <LinhaTB>
                {atualizarCategoria.length === 0 ? categoria?.descricao :
                  atualizarCategoria?.map((categoria_atualizada) => (
                    <Fragment>
                      {categoria_atualizada.id === categoria.id
                        ?
                        <input
                          type="text"
                          name="descricao"
                          defaultValue={categoria_atualizada.descricao}
                          onChange={event => handleChangeInputEditeCategory(event)}
                          className="form-control" id="descricao" placeholder="Digite a nova categoria"
                        />
                        : categoria.descricao
                      }
                    </Fragment>
                  ))
                }
              </LinhaTB>
              <LinhaTB>
                {atualizarCategoria.length === 0 ? 'NENHUMA' :

                  atualizarCategoria?.map((categoryUpdate) => (
                    <Fragment>
                      {categoryUpdate?.id === categoria.id
                        ?
                        <select
                          className="select-category"
                          value={idAtualizarCategoriaPai}
                          onChange={(e) => setIdAtualizarCategoriaPai(e.target.value)} >
                          <option value=''>
                            {categoria.categoria_pai || 'NENHUMA'}
                          </option>
                          <option>
                            NENHUMA
                          </option>
                          {
                            listaDeCategoriasPai?.map((categoria_pai) =>
                              <option key={categoria_pai.id} value={categoria_pai.id}>{categoria_pai.descricao}</option>
                            )
                          }
                        </select>
                        : 'NENHUMA'
                      }
                    </Fragment>
                  ))
                }
              </LinhaTB>
              <LinhaTableButton>
                <button onClick={() => handleEditeCategory(categoria)}>
                  <ClipboardText className="update-category" alt="Atualizar" />
                </button>
                <button onClick={() => handleSaveUpdatedOneCategory(atualizarCategoria)}>
                  <FloppyDisk className="save-category" alt="Salvar" />
                </button>
                <button >
                  <Dialog.Root>
                    <ModalDeleteCategory
                      idCategoryDelete={categoria.id}
                      handleIdCategoryDelete={handleIdCategoryDelete}
                    />
                  </Dialog.Root>
                </button>
              </LinhaTableButton>
            </LinhaTR>

            {categoria.sub?.map((subcategoria) => (
              <Fragment key={subcategoria.id}>
                <LinhaTR>
                  <LinhaTB>
                    {atualizarCategoria.length === 0 ? subcategoria?.descricao :
                      atualizarCategoria?.map((atualizar_cat) => (
                        <Fragment>
                          {atualizar_cat?.id === subcategoria?.id
                            ?
                            <input
                              type="text"
                              name="descricao"
                              defaultValue={subcategoria.descricao}
                              onChange={event => handleChangeInputEditeCategory(event)}
                              className="form-control" id="descricao" placeholder="Digite o nome da subcategoria"
                            />
                            : subcategoria?.descricao
                          }
                        </Fragment>
                      ))
                    }
                  </LinhaTB>
                  <LinhaTB>

                    {atualizarCategoria.length === 0 ? categoria.descricao :
                      atualizarCategoria?.map((i2, k2) => (
                        <Fragment key={k2}>
                          {atualizarCategoria[k2]?.id === subcategoria?.id
                            ?
                            <select
                              className="select-category"
                              value={idAtualizarCategoriaPai}
                              onChange={(e) => setIdAtualizarCategoriaPai(e.target.value)}
                            >
                              <option value=''>
                                {categoria.descricao || 'NENHUMA'}
                              </option>
                              <option>
                                NENHUMA
                              </option>
                              {
                                listaDeCategoriasPai?.map((category_pai) =>
                                  <option key={category_pai.id} value={category_pai.id}>{category_pai.descricao}</option>
                                )
                              }
                            </select>

                            : categoria.descricao
                          }
                        </Fragment>
                      ))
                    }
                  </LinhaTB>
                  <LinhaTableButton>
                    <button onClick={() => handleEditeCategory({ ...subcategoria, "categoria_pai": categoria.descricao })}>
                      <ClipboardText className="update-category" alt="Atualizar" />
                    </button>

                    <button onClick={() => handleSaveUpdatedOneCategory(atualizarCategoria)}>
                      <FloppyDisk className="save-category" alt="Salvar" />
                    </button>

                    {/* BUTTON OF MODAL OF DELETE ONE CATEGORY */}
                    <button>
                      <Dialog.Root >
                        <ModalDeleteCategory
                          idCategoryDelete={subcategoria.id}
                          handleIdCategoryDelete={handleIdCategoryDelete}
                        />
                      </Dialog.Root>
                    </button>
                    {/* BUTTON OF MODAL OF DELETE ONE CATEGORY */}
                  </LinhaTableButton>
                </LinhaTR>
              </Fragment>
            ))
            }
          </Fragment>
        ))
      }
    </Fragment>
  )
}
