import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import tw from "twin.macro";
import { useState } from "react";
const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;



const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
export default function Home(){
      const [visible, setVisible] = useState(7);
      const onLoadMoreClick = () => {
        setVisible(v => v + 6);
      };
    return <>
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{"Blog Posts"}</Heading>
          </HeadingRow>
          <>
           Content here
          </>
          {visible < 5 && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>
    </>
}
