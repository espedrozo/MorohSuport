import { NewPostForm } from "./components/NewPostForm";
import { Container, SectionRight, SectionScroll, TitlePost } from "./styles";

export function PostCreate() {
  return (
    <Container>
      <SectionRight>
        <TitlePost>CRIAR UM POST</TitlePost>
        <SectionScroll>

          <NewPostForm />

        </SectionScroll>
      </SectionRight>
    </Container>
  )
}