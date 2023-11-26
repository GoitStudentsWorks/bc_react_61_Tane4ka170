// base
import React from "react";

// svg
import arrow from '../../images/Sprite.svg';

// components
import Currency from './Currency'

// styled
import { StyledWrapper, StyledSvgWrapper, StyledSvg, StyledHeaders, StyledMoney, StyledTotalWrapper } from "./StyledTotal";


const TotalExpense = () => {
  // Место под юзСелектор но пока нету что селектить)
  const totalIncome = 150
  const currency = Currency('uah')

  return (
    <StyledWrapper>
      <StyledSvgWrapper>
        <StyledSvg width={18} height={18}>
          <use href={arrow + '#icon-Arrow-DWN'}/>
        </StyledSvg>
      </StyledSvgWrapper>
      <StyledTotalWrapper>
        <StyledHeaders>Total expense</StyledHeaders>
        <StyledMoney>{`${currency}${totalIncome}`}</StyledMoney>
      </StyledTotalWrapper>
    </StyledWrapper>
  );
}


export default TotalExpense;