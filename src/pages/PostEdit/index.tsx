import { FormEdit } from "./components/EditPostForm";
import { Container, SectionRight, SectionScroll, TitlePost } from "./styles";

export function PostEdit() {
  return (
    <Container>
      <SectionRight>
        <TitlePost>EDITAR UM POST</TitlePost>
        <SectionScroll>
          <FormEdit />
        </SectionScroll>
      </SectionRight>
    </Container>
  )
}