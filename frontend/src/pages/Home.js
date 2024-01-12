import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";

import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import { css } from "styled-components/macro";
import tw from "twin.macro";
import { useState } from "react";
const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;



export default function Home() {
  const [visible, setVisible] = useState(7);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };
  return <>
    <Container>
      <ContentWithPaddingXl>
        <Hero />
        <Features />
        <SliderCard />
        <TrendingCard />
        <MainFeature />
        <Blog />
        <Testimonial textOnLeft={true} />
        <FAQ />
        <SubscribeNewsLetterForm />
      </ContentWithPaddingXl>
    </Container>
  </>
}
