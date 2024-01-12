import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { Link } from "react-router-dom";

const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;


export default ({
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign Up With Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Sign Up With Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "/auth/login"
}) => (
  <>
    <FormContainer>
      <Form>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <SubmitButton type="submit">
          <SubmitButtonIcon className="icon" />
          <span className="text">{submitButtonText}</span>
        </SubmitButton>
        <p tw="mt-6 text-xs text-gray-600 text-center">
          I agree to abide by Plan-it's{" "}
          <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
            Terms of Service
          </a>{" "}
          and its{" "}
          <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
            Privacy Policy
          </a>
        </p>

        <p tw="mt-8 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to={signInUrl} tw="border-b border-gray-500 border-dotted">
            Sign In
          </Link>
        </p>
      </Form>
    </FormContainer>
  </>
);
