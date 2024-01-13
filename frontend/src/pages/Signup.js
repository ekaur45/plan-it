import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";

const FormContainer = tw.div`w-full flex-1 mt-8`;


const Form = tw.form`mx-auto max-w-xs`;
const SubmitButton = styled.a`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;


export default ({
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "/auth/login"
}) => (
  <>
    <FormContainer>
      <Form>
        {/* <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" /> */}
        <SubmitButton type="submit" href="/auth/signup/car-rental">
          {/* <SubmitButtonIcon className="icon" /> */}
          <span className="text">{"Car Rental"}</span>
        </SubmitButton>
        <SubmitButton type="submit" href="/auth/signup/decorator">
          {/* <SubmitButtonIcon className="icon" /> */}
          <span className="text">{"Decorator"}</span>
        </SubmitButton>
        {/* <p tw="mt-6 text-xs text-gray-600 text-center">
          I agree to abide by Plan-it's{" "}
          <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
            Terms of Service
          </a>{" "}
          and its{" "}
          <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
            Privacy Policy
          </a>
        </p> */}

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
