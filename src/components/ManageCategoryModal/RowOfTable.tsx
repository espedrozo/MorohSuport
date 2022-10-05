import { Fragment, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { ModalDeleteCategory } from '../ModalDeleteCategory';

import { ClipboardText, FloppyDisk, Trash } from 'phosphor-react';

//Importando dados da API
import { api } from '../../lib/Api';
import { LinhaTableButton, LinhaTB, LinhaTR } from './styles';

interface SubCategoriesProps {
  id: string;
  id_pai: string;
  descricao: string;
}

interface ListaDeCategoriesProps {
  id: string;
  descricao: string;
  sub?: SubCategoriesProps[];
}

interface ManageCategoryModalProps {

  idCategoriaPai: string;
  setIdCategoriaPai: (id: string) => void;
  handleIdCategoryDelete: (id: string) => void;
  listaDeCategorias: ListaDeCategoriesProps[];
  listaDeCategoriasPai: ListaDeCategoriesProps[];
}

export function RowOfTable(
  {
    idCategoriaPai,
    setIdCategoriaPai,
    handleIdCategoryDelete,
    listaDeCategorias,
    listaDeCategoriasPai
  }: ManageCategoryModalProps
) {

  const [idAtualizarCategoriaPai, setIdAtualizarCategoriaPai] = useState('');
  const [atualizarCategoria, setAtualizarCategoria] = useState<ListaDeCategoriesProps[]>([]);
  const [nenhuma] = useState('');

  // Função que atualiza uma categoria pelo ID clicado
  function fucAtualizarCat(e) {
    setAtualizarCategoria(e);
  }

  // Captura o valor do input dentro o MODAL para editar as categorias
  const handleChangeInputEditarCategoria = async (event) => {
    const val = [...atualizarCategoria];
    val[0].descricao = event.target.value;
  }

  // Função que vai atualizar as CATEGORIAS
  async function AtualizarUmaCategoria(index) {


    const id_cat = atualizarCategoria[0]?.id;
    const descricao = atualizarCategoria[0]?.descricao;

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

    const json = await api.updateCategories(
      id_cat,
      valoresDaCategoria
    );

    sessionStorage.removeItem('categorias');
    sessionStorage.removeItem('idCategorias');
    window.location.reload();
  }

  //  console.log("Categoria: ", listaDeCategorias);
  // console.log("Categorias PAI: ", listaDeCategoriasPai);
  console.log("categoria_atualizada : ", atualizarCategoria);


  return (
    <>
      {
        listaDeCategorias?.map((categoria) => (
          <Fragment key={categoria.id}>
            <LinhaTR>
              <LinhaTB>
                {atualizarCategoria.length === 0 ? categoria?.descricao :
                  atualizarCategoria?.map((categoria_atualizada) => (
                    <>
                      {categoria_atualizada.id === categoria.id
                        ?
                        <input
                          type="text"
                          name="descricao"
                          defaultValue={categoria_atualizada.descricao}
                          onChange={event => handleChangeInputEditarCategoria(event)}
                          className="form-control" id="descricao" placeholder="Digite a nova categoria"
                        />
                        : categoria.descricao
                      }
                    </>
                  ))
                }
              </LinhaTB>
              <LinhaTB>
                {atualizarCategoria.length === 0 ? 'NENHUMA' :

                  atualizarCategoria?.map((categ_pai) => (
                    <>
                      {categ_pai?.id === categoria.id
                        ?
                        <select
                          className="select-category"
                          value={idAtualizarCategoriaPai}
                          onChange={(e) => setIdAtualizarCategoriaPai(e.target.value)} >
                          <option value=''>
                            {categoria.categ_pai || 'NENHUMA'}
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
                    </>
                  ))
                }
              </LinhaTB>
              <LinhaTableButton>
                <button onClick={() => fucAtualizarCat([categoria])}>
                  <ClipboardText className="update-category" alt="Atualizar" />
                </button>
                <button onClick={() => AtualizarUmaCategoria(atualizarCategoria)}>
                  <FloppyDisk className="save-category" alt="Salvar" />
                </button>
                <button >
                  {/* MODAL Context RADIX-UI */}
                  <Dialog.Root>
                    <ModalDeleteCategory
                      idCategoryDelete={categoria.id}
                      handleIdCategoryDelete={handleIdCategoryDelete}
                    />
                  </Dialog.Root>

                  {/*  <Trash className="trash-category" alt="Deletar" /> */}
                </button>
              </LinhaTableButton>
            </LinhaTR>

            {categoria.sub?.map((subcategoria) => (
              <Fragment key={subcategoria.id}>
                <LinhaTR>
                  <LinhaTB>
                    {atualizarCategoria.length === 0 ? subcategoria?.descricao :
                      atualizarCategoria?.map((atualizar_cat) => (
                        <>
                          {atualizar_cat?.id === subcategoria?.id
                            ?
                            <input
                              type="text"
                              name="descricao"
                              defaultValue={subcategoria.descricao}
                              onChange={event => handleChangeInputEditarCategoria(event)}
                              className="form-control" id="descricao" placeholder="Digite o nome da subcategoria"
                            />
                            : subcategoria?.descricao
                          }
                        </>
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
                    <button onClick={() => fucAtualizarCat([{ ...subcategoria, "categoria_pai": categoria.descricao }])}>
                      <ClipboardText className="update-category" alt="Atualizar" />
                    </button>
                    <button onClick={() => AtualizarUmaCategoria(atualizarCategoria)}>
                      <FloppyDisk className="save-category" alt="Salvar" />
                    </button>

                    {/* MODAL Context RADIX-UI */}
                    <button>
                      <Dialog.Root >
                        <ModalDeleteCategory
                          idCategoryDelete={subcategoria.id}
                          handleIdCategoryDelete={handleIdCategoryDelete}
                        />
                      </Dialog.Root>
                    </button>

                  </LinhaTableButton>
                </LinhaTR>
              </Fragment>
            ))
            }
          </Fragment>
        ))

      }
    </>
  )
}
