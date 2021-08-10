import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

import { Container } from './styles';

export default function Paging({ paging, loadItems }) {
  const { currentPage, totalPages } = paging;

  const [disablePreviousButton, setDisablePreviousButton] = useState(true);
  const [disableNextButton, setDisableNextButton] = useState(true);

  const disableButtons = useCallback(() => {
    if (totalPages === 1) {
      setDisablePreviousButton(true);
      setDisableNextButton(true);
    } else if (currentPage === 1) {
      setDisablePreviousButton(true);
      setDisableNextButton(false);
    } else if (currentPage === totalPages) {
      setDisableNextButton(true);
      setDisablePreviousButton(false);
    } else {
      setDisableNextButton(false);
      setDisablePreviousButton(false);
    }
  }, [currentPage, totalPages]);

  const pageText = useMemo(() => {
    return `${currentPage} de ${totalPages}`;
  }, [currentPage, totalPages]);

  useEffect(() => {
    disableButtons(1);
  }, [disableButtons]);

  function handleFirstPage() {
    disableButtons(1);
    loadItems(1);
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      loadItems(currentPage - 1);
    }
    disableButtons(currentPage);
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      loadItems(currentPage + 1);
    }
    disableButtons(currentPage);
  }

  function handleLastPage() {
    loadItems(totalPages);
    disableButtons(currentPage);
  }

  return (
    totalPages >= 1 && (
      <Container>
        <button
          type="button"
          onClick={handleFirstPage}
          disabled={disablePreviousButton}
        >
          <MdFirstPage
            size={30}
            color={disablePreviousButton ? '#bbb' : '#666'}
          />
        </button>
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={disablePreviousButton}
        >
          <MdChevronLeft
            size={30}
            color={disablePreviousButton ? '#bbb' : '#666'}
          />
        </button>
        <span>{pageText}</span>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={disableNextButton}
        >
          <MdChevronRight
            size={30}
            color={disableNextButton ? '#bbb' : '#666'}
          />
        </button>
        <button
          type="button"
          onClick={handleLastPage}
          disabled={disableNextButton}
        >
          <MdLastPage size={30} color={disableNextButton ? '#bbb' : '#666'} />
        </button>
      </Container>
    )
  );
}

Paging.propTypes = {
  paging: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
  }).isRequired,
  loadItems: PropTypes.func.isRequired,
};
