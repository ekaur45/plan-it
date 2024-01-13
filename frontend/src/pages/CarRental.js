import React from "react";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

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
export default function CarRental({ submitButtonText = "Submit",
    SubmitButtonIcon = LoginIcon, }) {
    return <>
        <Form>
            <Input type="text" placeholder="First name" />
            <Input type="text" placeholder="Last name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <SubmitButton type="submit">
                <SubmitButtonIcon className="icon" />
                <span className="text">{submitButtonText}</span>
            </SubmitButton>
        </Form>
    </>
}