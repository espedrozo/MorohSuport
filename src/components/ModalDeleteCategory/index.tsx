import React from 'react';
import { styled, keyframes } from '@stitches/react';
import { blackA, red, mauve } from '@radix-ui/colors';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Trash } from 'phosphor-react';

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
  width: '900px',
  maxWidth: '300px',
  maxHeight: '250px',
  padding: 20,
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
  marginTop: 10,
  marginBottom: 15,
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
  height: 40,
  width: 90,
  border: 'none',

  variants: {
    variant: {
      violet: {
        backgroundColor: '#dc3545',
        color: '#fff',
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: '#ca2b3b', cursor: 'pointer' },
        '&:focus': { outline: 'none' },
      },
      red: {
        backgroundColor: red.red4,
        color: red.red11,
        '&:hover': { backgroundColor: red.red5, cursor: 'pointer' },
        '&:focus': { outline: 'none' },
      },
      mauve: {
        backgroundColor: '#dddd',
        color: '#202024',
        '&:hover': { backgroundColor: '#cecece', cursor: 'pointer' },
        '&:focus': { outline: 'none' },
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

interface DeleteModalProps {
  idCategoryDelete: string;
  handleIdCategoryDelete: (id: string) => void;
}

export function ModalDeleteCategory({ handleIdCategoryDelete, idCategoryDelete }: DeleteModalProps) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash className="trash-category" alt="Deletar" />
      </AlertDialogTrigger>
      <AlertDialogContent >
        <AlertDialogTitle>COFIRMAÇÃO DE EXCLUSÃO</AlertDialogTitle>
        <AlertDialogDescription>
          Deseja realmente excluir?.
        </AlertDialogDescription>
        <Flex css={{ justifyContent: 'center' }}>
          <AlertDialogCancel asChild>
            <Button variant="mauve" css={{ marginRight: 25 }}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="red" onClick={() => handleIdCategoryDelete(idCategoryDelete)}>Sim</Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  );
}