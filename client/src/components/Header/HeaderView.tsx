import FileInput from "../FileInput/FileInput";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { CenterContainer, Header, LeftContainer, RightContainer, Wrapper } from "./header.styled";

function HeaderView() {
  return (
    <Header>
      <div className="container">
        <Wrapper>
          <LeftContainer>
            <span className="logo">Quiz resolver</span>
          </LeftContainer>
          <CenterContainer>
            <FileInput />
          </CenterContainer>
          <RightContainer>
            <LanguageSwitcher />
          </RightContainer>
        </Wrapper>
      </div>
    </Header>
  );
}

export default HeaderView;
