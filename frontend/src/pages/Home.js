import { Container, ContentWithPaddingXl } from "components/misc/Layouts";


import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import { css } from "styled-components/macro"; //eslint-disable-line





export default function Home() {
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
