import { useState } from 'react';
import { api } from '../../lib/Api';
import { PlusCircle, X } from "phosphor-react";
import { blackA, mauve } from '@radix-ui/colors';
import * as Dialog from '@radix-ui/react-dialog';
import { styled, keyframes } from '@stitches/react';
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";
import { ModalManageCategory } from '../ModalManageCategory';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import {
  CancelButton,
  ConfirmationButton,
  InputSearchResults,
  AreaAddNewCategories,
  AreaButtonsAddNewCategories
} from "./styles";

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: '400px',
  maxHeight: '350px',
  padding: 10,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

function Content({ children, ...props }: any) {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </AlertDialogPrimitive.Portal>
  );
}

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: '#005693',
  textAlign: 'center',
  fontSize: 17,
  fontWeight: 700,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  textAlign: 'center',
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const AlertDialogContent = Content;
export const AlertDialogTitle = StyledTitle;
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogDescription = StyledDescription;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// Your app...
const Flex = styled('div', { display: 'flex' });

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 5px',
  fontSize: 16,
  lineHeight: 1,
  fontWeight: 500,
  border: 'none',

  variants: {
    variant: {
      addNewCategory: {
        backgroundColor: 'transparent',
        color: '#005693',
        '&:hover': { cursor: 'pointer' },
        '&:focus': { outline: 'none' },
      },
      search: {
        backgroundColor: 'transparent',
        color: '#7C7C8A',
        '&:hover': { cursor: 'pointer', color: '#005693' },
        '&:focus': { outline: 'none' },
      },
      cancel: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        color: '#7C7C8A',
        padding: 0,
        '&:hover': { cursor: 'pointer', color: '#202024', border: '1px solid #7C7C8A', },
        '&:focus': { outline: 'none' },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

interface ListaDeCategoriesPaiProps {
  id: string;
  descricao: string;
}

interface AddNewCategoryModalProps {
  idCategoriaPai: string;
  setIdCategoriaPai: (id: string) => void;
  listaDeCategoriasPai: ListaDeCategoriesPaiProps[];
}

export function ModalAddNewCategory(
  {
    idCategoriaPai,
    setIdCategoriaPai,
    listaDeCategoriasPai,
  }: AddNewCategoryModalProps) {

  const {
    reloadContext,
    setReloadContext,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState('');

  async function handleAddNewCategory() {

    if (newCategory.trim() !== '') {

      const dataNewCategory = [
        {
          id_cat: "",
          descricao: newCategory,
          id_pai: idCategoriaPai,
        }
      ]

      const response = await api.createNewCategory(dataNewCategory[0]);

      if (response.status === 'error') {
        setError(response.message);

      } else {
        localStorage.removeItem('@moroh-suport-v1.0.2:idRecentes');
        localStorage.removeItem('@moroh-suport-v1.0.2:postRecentes');

        setReloadContext(!reloadContext);
      }
    } else {
      console.log("ERROR: Digite o nome de uma categoria!");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="addNewCategory">
          <PlusCircle size={34} weight="fill" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent >

        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <AlertDialogTitle css={{ justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', width: '100%' }}>ADICIONAR NOVA CATEGORIA</AlertDialogTitle>
          <Flex css={{ cursor: 'pointer' }}>
            <AlertDialogCancel asChild>
              <Button variant="cancel">
                <X size={24} />
              </Button>
            </AlertDialogCancel>
          </Flex>
        </Flex>

        <Flex css={
          {
            marginTop: '15px',
            marginBottom: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }
        }
        >
          <AreaAddNewCategories>
            <label>Descrição da categoria:</label>
            <InputSearchResults
              type="text"
              name="descricao"
              value={newCategory}
              placeholder="Digite a nova categoria..."
              onChange={event => setNewCategory(event.target.value)}
            />
          </AreaAddNewCategories>

          <AreaAddNewCategories>
            <label>Categoria Pai:</label>
            <select
              value={idCategoriaPai}
              className="select-category"
              onChange={e => setIdCategoriaPai(e.target.value)}
            >
              <option value=""> Nenhuma </option>
              {
                listaDeCategoriasPai?.map((category) =>
                  <option key={category.id} value={category.id}>{category.descricao}</option>
                )
              }
            </select>
          </AreaAddNewCategories>
        </Flex>

        <AreaButtonsAddNewCategories>

          {/* BUTTON OF MODAL OF MANAGE CATEGORIES */}
          <Dialog.Root>
            <ModalManageCategory />
          </Dialog.Root>
          {/* FIM OF MODAL OF MANAGE CATEGORIES */}

          <AlertDialogCancel asChild>
            <CancelButton>
              Cancelar
            </CancelButton>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <ConfirmationButton
              disabled={newCategory === ""}
              onClick={() => handleAddNewCategory()}
            >
              Confirmar
            </ConfirmationButton>
          </AlertDialogAction>
        </AreaButtonsAddNewCategories>
      </AlertDialogContent>
    </AlertDialog>
  );
}