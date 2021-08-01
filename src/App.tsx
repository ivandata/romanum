import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import SymbolsContainer, {
  arabicToRoman,
  romanToArabic,
} from './SymbolsContainer';

const App: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [romanValue, setRomanValue] = useState<string>('');
  const [arabicValue, setArabicValue] = useState<number>(0);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value.toUpperCase();

    if (!isNaN(+value) && !isNaN(parseFloat(value))) {
      setRomanValue(arabicToRoman(+value));
      setArabicValue(0);
    } else {
      setRomanValue('');
      setArabicValue(romanToArabic(value));
    }

    setInputValue(value);
  };

  return (
    <SMainContainer>
      <SHeader>
        <h1>Arabic Roman converter</h1>
      </SHeader>
      <SSectionContainer>
        <SLabel htmlFor="inputId">
          <SInput
            id="inputId"
            type="text"
            value={inputValue}
            onChange={onChange}
            autoComplete="off"
            placeholder="Enter any number or roman numeric"
          />
        </SLabel>

        {arabicValue > 0 ? (
          <>
            <SymbolsContainer
              kind="arabic"
              values={inputValue}
              total={arabicValue}
            />
          </>
        ) : (
          <SymbolsContainer
            kind="roman"
            values={romanValue}
            total={+inputValue}
          />
        )}
        {!arabicValue && !romanValue && (
          <SDescription>
            <p>
              Roman numerals are essentially a decimal or &ldquo;base ten&rdquo; number
              system, but instead of place value notation (in which
              place-keeping zeros enable a digit to represent different powers
              of ten) the system uses a set of symbols with fixed values,
              including &ldquo;built in&rdquo; powers of ten.
            </p>
            <p>
              Modern usage of Roman numerals employs seven symbols, each with a
              fixed integer value:
            </p>
            <table>
              <tbody>
                <tr>
                  <td>Symbol</td>
                  <td>I</td>
                  <td>V</td>
                  <td>X</td>
                  <td>L</td>
                  <td>C</td>
                  <td>D</td>
                  <td>M</td>
                </tr>
                <tr>
                  <td>Value</td>
                  <td>1</td>
                  <td>5</td>
                  <td>10</td>
                  <td>50</td>
                  <td>100</td>
                  <td>500</td>
                  <td>1000</td>
                </tr>
              </tbody>
            </table>
          </SDescription>
        )}
      </SSectionContainer>
      <SFooter>
        Made with ❤️ by{' '}
        <a href="https://imalov.dev/" target="_blank" rel="noopener noreferrer">
          Malov
        </a>
      </SFooter>
    </SMainContainer>
  );
};

export default App;

const SHeader = styled.header`
  margin-bottom: 1rem;
  text-align: center;
`;

const SMainContainer = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 320px;
  padding: 1rem;
`;

const SLabel = styled.label`
  max-width: 400px;
  display: block;
  margin: 0 auto;
`;

const SInput = styled.input`
  padding: 1rem 1.2rem;
  font-size: 1.2rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #bababa;
  transition: all cubic-bezier(0.4, 0, 1, 1);
  outline: none;
  background-color: #fff;

  &:hover {
    border-color: #aaaaaa;
  }

  &:focus {
    border-color: #343434;
  }
`;

const SSectionContainer = styled.section`
  height: 100%;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
`;

const SFooter = styled.footer``;

const SDescription = styled.div`
  max-width: 400px;
  margin: 0 auto;

  td {
    padding: .5rem;
  }

  td:first-child {
    padding-left: 0;
    padding-right: 1rem;
  }
`;
