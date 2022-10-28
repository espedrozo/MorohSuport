import { X } from "phosphor-react"
import { api } from '../../lib/Api';
import { RowOfTable } from './RowOfTable';
import { useEffect, useState } from 'react';
import { styled, keyframes } from '@stitches/react';
import { blackA, red, mauve } from '@radix-ui/colors';
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";
import { ManegerButton, TableOfCategories } from "./styles";
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

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
  maxWidth: '550px',
  maxHeight: '350px',
  padding: '10px 5px',
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
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = Content;
export const AlertDialogTitle = StyledTitle;
export const AlertDialogDescription = StyledDescription;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

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

export function ModalManageCategory() {

  const {
    reloadContext,
    setReloadContext,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  const [listaDeCategorias, setListaDeCategorias] = useState([]);
  const [listaDeCategoriasPai, setListaDeCategoriasPai] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {

      const response = await api.getNewCategories();

      if (response) {
        setListaDeCategorias(response);
        setListaDeCategoriasPai(response);
      }
    }

    getAllCategories();
  }, [reloadContext]);


  async function handleIdCategoryDelete(id: string) {

    if (id) {
      const response = await api.deleteCategory(id);
      console.log("RESPONSE: USAR TOSKT INFORMATIVO ", response);

      localStorage.removeItem('@moroh-suport-v1.0.1:idRecentes');
      localStorage.removeItem('@moroh-suport-v1.0.1:postRecentes');

      localStorage.removeItem('@moroh-suport-v1.0.1:allCategories');
      localStorage.removeItem('@moroh-suport-v1.0.1:listOfIdOfCategories');

      setReloadContext(!reloadContext);

    } else {
      console.log('Error: Não foi possível excluir categoria!')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ManegerButton>Gerenciar</ManegerButton>
      </AlertDialogTrigger>
      <AlertDialogContent >

        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <AlertDialogTitle css={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>EDITAR CATEGORIAS</AlertDialogTitle>
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

          <TableOfCategories>
            <thead>
              <tr>
                <th>DESCRIÇÃO</th>
                <th>CATEGORIAS PAI</th>
                <th>EDITAR</th>
              </tr>
            </thead>
            <tbody>
              <RowOfTable
                listaDeCategorias={listaDeCategorias}
                listaDeCategoriasPai={listaDeCategoriasPai}
                handleIdCategoryDelete={handleIdCategoryDelete}
              />
            </tbody>
          </TableOfCategories>

        </Flex>

      </AlertDialogContent>
    </AlertDialog>
  );
}