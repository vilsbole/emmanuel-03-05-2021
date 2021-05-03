import styled from "styled-components";

const defaultProps = { size: "10px", color: "primary" };

const Dot = styled.span<typeof defaultProps>`
  height: ${(p) => p.size};
  width: ${(p) => p.size};
  background-color: ${(p) => p.theme["colors"][p.color]};
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin-top: 2px;
`;
Dot.defaultProps = defaultProps;

export default Dot;
