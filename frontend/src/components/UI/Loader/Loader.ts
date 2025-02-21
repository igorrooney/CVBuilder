import styled from 'styled-components';
import tw from 'twin.macro';

const Loader = styled.div`
  ${tw`h-5 w-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin`}
`;

export default Loader;
