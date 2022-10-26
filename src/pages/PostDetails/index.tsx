
import { Post } from "./components/Post";
import { Container, SectionRight, SectionScroll } from "./styles";

export function PostDetails() {
  return (
    <Container>
      <SectionRight>
        <SectionScroll>
          <Post />
        </SectionScroll>
      </SectionRight>
    </Container>
  )
}