import styled from 'styled-components';
import tw from 'twin.macro';

const Button = styled.button`
  ${tw`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
  &:disabled {
    ${tw`bg-gray-400 cursor-not-allowed`}
  }
`;

export default Button;
