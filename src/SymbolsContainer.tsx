import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const romanValuesType: {
  [key: string]: number;
} = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

export function arabicToRoman(value: number): string {
  let roman = '';
  for (const i in romanValuesType) {
    while (value >= romanValuesType[i]) {
      roman += i;
      value -= romanValuesType[i];
    }
  }
  return roman;
}

export function romanToArabic(value: string): number {
  if (!romanValuesType[value]) {
    const matchedValue = getMatchedRoman(value);
    let num = 0;

    for (const item of matchedValue) {
      const val =
        romanValuesType[item] ||
        item.split('').reduce((acc, i) => acc + romanValuesType[i] || acc, 0);
      num = val ? num + val : num;
    }

    return num;
  }

  return romanValuesType[value];
}

export function getMatchedRoman(value: string): string[] {
  return [
    ...value
      .match(/(M*)((CM)*)((D)*)([I]*?)([DC]*(XC)?)((C)?)([LX]*(IX)?)([IV]*)/)!
      [Symbol.iterator](),
  ]
    .splice(1)
    .filter((x, i) => i % 2 == 0 && x);
}

type SymbolsContainerProps = {
  kind: 'roman' | 'arabic';
  values: string;
  total: number;
};

const SymbolsContainer: FunctionComponent<SymbolsContainerProps> = ({
  kind,
  values,
  total,
}) => {
  console.log(total);
  const isRoman = kind === 'roman';
  const isArabic = kind === 'arabic';
  return (
    <SSymbolContainer>
      { isArabic && total && <STotal>={total}</STotal> }
      <SSymbolList>
        {getMatchedRoman(values).map(
          (x, i) =>
            x && (
              <SSymbol
                key={i + x}
                data-label={isRoman ? romanToArabic(x) : x}
              >
                {isArabic ? romanToArabic(x) : x}
              </SSymbol>
            ),
        )}
      </SSymbolList>
      { isRoman && total > 0 && <STotal>={total}</STotal> }
    </SSymbolContainer>
  );
};

export default SymbolsContainer;

const SSymbolContainer = styled.div`
`;

const SSymbolList = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  display: flex;
  font-size: 7rem;
  margin-top: 4rem;
  font-family: 'Nanum Myeongjo', serif;
`;

const SSymbol = styled.div`
  position: relative;
  margin-bottom: 2rem;

  & + & {
    margin-left: 10px;
  }

  &:after {
    content: attr(data-label);
    position: absolute;
    font-size: 1rem;
    bottom: -1.4rem;
    left: 0;
    color: #ff00ff;
    display: block;
    width: 100%;
    text-align: center;
    letter-spacing: 1.5px;
  }

  &:before {
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    position: absolute;
    content: '';
    width: 100%;
    height: 0.5rem;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #b0b0b0;
  }
`;

const STotal = styled.div`
  margin: 1rem 0;
  font-size: 3rem;
  text-align: center;
`;
