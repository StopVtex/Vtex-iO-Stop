export const ADD_CLASS = 'ADD_CLASS'
export const REMOVE_CLASS = 'REMOVE_CLASS'

export const updateFocusClassHeader = (type: string) => {
  const focusClass = 'vtex-store-header-2-x-headerRowBackground--header-main-focus'
  const header = document.querySelector('.vtex-store-header-2-x-headerRowBackground--header__componentes')
  if( !header ) return
  switch (type) {
    case ADD_CLASS:
      if( header.classList.contains(focusClass) ) break
      header.classList.add(focusClass)
      break;
    case REMOVE_CLASS:
      if( !header.classList.contains(focusClass) ) break
      header.classList.remove(focusClass)
      break;
    default:
      break;
  }
}