import { AreaPagination, Box, Stack, Text, Image } from './styles';

import { PaginationItem } from "./PaginationItem";
import { Fragment } from 'react';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

// Funcão que gera intervalos de paginas aa serem exibidos na paginação
function generatePagesArrays(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 5,
  currentPage = 1,
  onPageChange
}: PaginationProps) {

  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPage = currentPage > 1
    ? generatePagesArrays(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPage = currentPage < lastPage
    ? generatePagesArrays(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Fragment>
      {totalCountOfRegisters >= 1 &&
        <AreaPagination>
          <Fragment>
            <Box>
              <strong>Página {currentPage} de {lastPage} </strong>
            </Box>
            <Stack>

              {currentPage > (1 + siblingsCount) && (
                <>
                  <PaginationItem onPageChange={onPageChange} number={1} />
                  {currentPage > (2 + siblingsCount) && <Text>...</Text>}
                </>
              )}

              {previousPage.length > 0 && previousPage.map((page) => {
                return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
              })}

              <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

              {nextPage.length > 0 && nextPage.map((page) => {
                return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
              })}

              {(currentPage + siblingsCount) < lastPage && (
                <>
                  {(currentPage + 1 + siblingsCount) < lastPage && <Text>...</Text>}
                  <PaginationItem onPageChange={onPageChange} number={lastPage} />
                </>
              )}
            </Stack>
          </Fragment>
        </AreaPagination>
      }
    </Fragment>
  );
}