import { blackA, mauve } from '@radix-ui/colors';
import { styled, keyframes } from '@stitches/react';
import { MagnifyingGlass, PlusCircle, X } from "phosphor-react"
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { InputSearchResults, AreaLinsRealations, LiAddLink, UlLink, ButtonAddLink } from "./styles";

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
  maxWidth: '500px',
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
  padding: '0',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  border: 'none',

  variants: {
    variant: {
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

interface AddNewRelationsLinsModalProps {
  palavra: string;
  listOfLinksWithRelations: any[];
  handleAddNewRelationOfLinks: (linkRelation: any) => void;
  handleSearchOfLinksWithRelations: (event: any) => Promise<void>;
  handleChangeInputOfLinksWithRelations: (palavraPesquizada: string) => void;
}

export function ModalAddLinkRelation(
  {
    palavra,
    listOfLinksWithRelations,
    handleAddNewRelationOfLinks,
    handleSearchOfLinksWithRelations,
    handleChangeInputOfLinksWithRelations,
  }: AddNewRelationsLinsModalProps) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonAddLink>
          <PlusCircle size={34} weight="fill" className="add_links" /> Links
        </ButtonAddLink>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>

          <AlertDialogTitle css={{ justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', width: '100%' }}>ADICIONAR TÓPICOS RELACIONADOS</AlertDialogTitle>
          <Flex css={{ cursor: 'pointer' }}>
            <AlertDialogCancel asChild>
              <Button variant="cancel">
                <X size={22} />
              </Button>
            </AlertDialogCancel>
          </Flex>
        </Flex>

        <Flex css={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }} >
          <InputSearchResults
            type="search"
            name="search"
            id="search"
            placeholder="Digite sua pesquisa..."
            onChange={(e) => handleChangeInputOfLinksWithRelations(e.target.value)}
          />

          <Button variant="search" onClick={handleSearchOfLinksWithRelations}>
            <MagnifyingGlass size={30} />
          </Button>

        </Flex>

        {palavra &&
          <AreaLinsRealations>
            <UlLink>
              {listOfLinksWithRelations?.map((linkRelation) => (
                <LiAddLink
                  key={linkRelation.id_post}
                  value={linkRelation.id_post}
                  onClick={() => handleAddNewRelationOfLinks(linkRelation)}
                >
                  <span>
                    <PlusCircle />
                    {linkRelation.titulo}
                  </span>
                </LiAddLink>
              ))}
            </UlLink>
          </AreaLinsRealations>
        }
      </AlertDialogContent>
    </AlertDialog>
  );
}