import { ButtonActived, Button } from './styles'

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem(
  { number,
    onPageChange,
    isCurrent = false
  }: PaginationItemProps) {

  if (isCurrent) {
    return (
      <ButtonActived>
        {number}
      </ButtonActived>
    )
  }
  return (
    <Button onClick={() => onPageChange(number)}>
      {number}
    </Button>
  );
}